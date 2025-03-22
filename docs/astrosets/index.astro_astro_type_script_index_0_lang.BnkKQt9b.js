import{loadPyodide as n}from"https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs";async function i(){let o=await n();console.log(o.runPython("1 + 2"))}i();
