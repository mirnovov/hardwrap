nova.commands.register("novov.hardwrap.wrap", (editor) => {
    editor.insert(hardWrap(editor.getTextInRange(editor.selectedRanges[0]),nova.config.get("novov.hardwrap.breakat")));
});

function hardWrap(text, max) {
    var result = "",
        leading = "";
    
    if(nova.config.get("novov.hardwrap.leading")) {
        var comment = /^#(\t|\u0020)*/g, space = /^(\t|\u0020)+/g;
        
        if(comment.test(text)) { 
            leading = text.match(comment)[0];
            text = text.replaceAll(comment,"").replaceAll(/\n#(\t|\u0020)*/g,"\n");
        }
        else if(space.test(text)) {
            leading = text.match(space)[0];
            text = text.replaceAll(space,"").replaceAll(/\n(\t|\u0020)+/g,"\n");
        }        
    } 
        
    if(nova.config.get("novov.hardwrap.remove")) {
        text = text.replaceAll(/\n(?!\n)/g," ").replaceAll(/\n\s?/g,"\n\n");
    }
    
    while(true) {
        if(text.length < max) { result += text; break; }
        
        var wrapat = max,
            newline = text.lastIndexOf("\n",max),
            space = text.lastIndexOf(" ",max);
        
        if(newline != -1 && newline != 0) { wrapat = newline; }
        else if(space != -1 && space != 0) { wrapat = space; }
        
        var line = text.substring(0,wrapat);
        text = text.substring(wrapat);
        
        if(wrapat == space) { text = text.replaceAll(/^\u0020/g,""); }   
        if(!line.endsWith("\n")) { line += "\n"; }
            
        result += line;
    }
    
    if(nova.config.get("novov.hardwrap.leading") && leading != "") {
        return leading + result.replaceAll("\n","\n" + leading);
    }
    
    return result;
}


    

