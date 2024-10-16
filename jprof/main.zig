const std = @import("std");
const httpz = @import("httpz");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();

    var server = try httpz.Server().init(allocator, .{ .port = 4200 });

    // overwrite the default notFound handler
    server.notFound(notFound);

    // overwrite the default error handler
    server.errorHandler(errorHandler);

    var router = server.router();

    // use get/post/put/head/patch/options/delete
    // you can also use "all" to attach to all methods
    router.get("/lab/backends/zig", hello);

    // start the server in the current thread, blocking.
    try server.listen();
}

fn hello(req: *httpz.Request, res: *httpz.Response) !void {
    std.debug.print("Zig: Get {s}\n", .{req.url.raw});
    res.status = 200;
    res.body = "Hello Zig!";
}

fn notFound(_: *httpz.Request, res: *httpz.Response) !void {
    res.status = 404;
    res.body = "Not Found";
}

// note that the error handler return `void` and not `!void`
fn errorHandler(req: *httpz.Request, res: *httpz.Response, err: anyerror) void {
    res.status = 500;
    res.body = "Internal Server Error";
    std.log.warn("httpz: unhandled exception for request: {s}\nErr: {}", .{ req.url.raw, err });
}
