function router(handle, pathname,id,req,res) {
    console.log("Now router a request for '" + pathname +"'");
    if (typeof handle[pathname] === 'function') {
        if(id === undefined){
            handle[pathname](req,res,(err) =>{console.log(err)});
        }
        else{
            handle[pathname](id,req,res,(err) =>{console.log(err)});
        }
    } else {
        console.log("No request handler found for " + pathname);
        res.writeHead(400, {'Content-Type': 'application/json'});
        let  ret = {'errMsg':'Error'};
        res.end(JSON.stringify(ret))
    }
}

exports.route = router;
