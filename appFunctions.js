let themeFunction = require('./themeFunctions');
let db = require('../config/dbConnect');


function renderApp(res,shop,accessToken){
  //  let sql = 'SELECT * FROM setting WHERE store_id = ?';
  //  let params = shop;
    themeFunction.getThemeActiveId(shop,accessToken).then ((theme)=>{
        theme = JSON.parse(theme);
        let themeID = theme.themes.filter(({role}) => role === "main")[0].id;
        themeFunction.AddScriptTheme(accessToken,shop,themeID)
               let sql='SELECT * FROM app_setting WHERE store_id = ?'
                db.con.query(sql,shop, (err, row) => {
              
                    if(row.length===0 ||JSON.stringify(row) === '[]')
                    {
                  let data = {
                            statuAtc : "N",
                            statuCheckOut :   "N",
                            statuApp : "0"
                        }
                        let scriptval = `<script> let statuAtc='${data.statuAtc}'
                         let statuCheckOut = '${data.statuCheckOut}' 
                         let statuApp =  '${data.statuApp}'
                            if(statuCheckOut == "Y") {
function serviceWorkerRegistered(){
}


var whole_window_url = new URL(window.location.href);
var pathname = whole_window_url.pathname;
var url_depth = pathname.split("/").length-1;
var prefix = '';
var shop = '${shop}'

if(url_depth > 1){
    for(loop=1;loop < url_depth; loop++){
        prefix += "../";
    }
}

var prefix_scope = '';
if(url_depth > 0){
    for(loop=0;loop < url_depth; loop++){
        prefix_scope += "../";
    }
}
if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('https://'+shop+'/a/4651387/hdcheckout.js', {
                scope: ''+prefix_scope+''
            }).then(serviceWorkerRegistered);
        }}
 </script> `
 let dtscript =scriptval+
                            "<script async src=\"//{{ shop.domain }}/a/4651387/hideppl.js\"></script>"
                        themeFunction.addLiquidToTheme(accessToken,shop,themeID,dtscript).then ((theme)=>{

                            res.render('index',{data : data})
                        })
                            .catch((err) => {
                            throw err;
                        })
                    }else {
                        let data = row[0]
                        res.render('index',{data : data})
                    }
        })
    }).catch((err) => {
            throw err;
                      })
}

function addValueDynamic(res,accessToken
                         ,themeID,data,shop){

    let scriptval = `<script>


  var cleaned_host = window.location.host;
  console.log(cleaned_host)
 let statuAtc='${data.statuAtc}' 
                        let statuCheckOut = '${data.statuCheckOut}' 
                        let statuApp =  '${data.statuApp}'
                            if(statuCheckOut == "Y") {                        
                        var whole_window_url = new URL(window.location.href);
                        var pathname = whole_window_url.pathname;
                        var url_depth = pathname.split("/").length-1;
                        var prefix = '';
                        var shop = cleaned_host
function serviceWorkerRegistered(){
 if(url_depth > 1){
 for(loop=1;loop < url_depth; loop++){
                                prefix += "../";
                            }
                        }
                      
                        var prefix_scope = '';
                        if(url_depth > 0){
                            for(loop=0;loop < url_depth; loop++){
                                prefix_scope += "../";
                            }
                        }
                        if ('serviceWorker' in navigator) {
                                    navigator.serviceWorker.register('https://'+shop+'/a/4651387/hdcheckout.js', {
                                        scope: ''+prefix_scope+''
                                    }).then(serviceWorkerRegistered);
                                }
                        }

   serviceWorkerRegistered();
 setTimeout(function(){                        
    serviceWorkerRegistered();     
 }, 4500);
 }
      
                        </script> `
    let dtscript =scriptval+
        "<script async src=\"//{{ shop.domain }}/a/4651387/hideppl.js\"></script>"

    themeFunction.addLiquidToTheme(accessToken,shop,themeID,dtscript).then ((theme)=>{
res.status(200).send("ok")
    }).catch((err) => {
        throw err;
    })
}




module.exports = {
    renderApp,
    addValueDynamic
}
