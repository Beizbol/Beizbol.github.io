import"./hoisted.B1_uNwtp.js";async function f(){const t=document.getElementById("scan"),n=document.getElementById("stop"),r=document.getElementById("write"),l=document.getElementById("no-support"),i=document.getElementById("txt"),g=document.getElementById("lbl");if(document.getElementById("nfc-dialog"),!("NDEFReader"in window)){console.log("NFC not supported on this device."),t.disabled=!0,n.disabled=!0,r.disabled=!0,i.disabled=!0,g.classList.add("hidden"),l.classList.remove("hidden");return}if((await navigator.permissions.query({name:"nfc"})).state==="denied"){console.log("NFC permission denied");return}const a=new AbortController,o=new NDEFReader;o.onreadingerror=e=>{console.log("Cannot read data from the NFC tag. Try another one?"),console.log(`Error: ${e}`)},o.onwriteerror=e=>{console.log("Cannot write data to the NFC tag. Try another one?"),console.log(`Error: ${e}`)},o.onreading=e=>{const s=e.message;console.log("NFC tag detected!",s);for(const d of s.records)switch(console.log("Record type:  "+d.recordType),console.log("MIME type:    "+d.mediaType),console.log("Record id:    "+d.id),d.recordType){}};async function u(){t.disabled=!0,n.disabled=!1,await o.scan({signal:a.signal}).catch(e=>{console.log(`Error! Scan failed to start: ${e}.`)})}function c(){a.abort(),t.disabled=!1,n.disabled=!0}async function m(){r.disabled=!0,t.disabled&&c();const e={recordType:"url",data:"https://www.jakesite.ca/"};await o.write({records:[e]}).catch(s=>{console.log(`Error! Write failed: ${s}.`)}),console.log("NFC tag written successfully!"),r.disabled=!1}t.addEventListener("click",u),r.addEventListener("click",m),n.addEventListener("click",c)}document.addEventListener("astro:page-load",f);