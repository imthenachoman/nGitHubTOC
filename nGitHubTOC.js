function tocIt(inputMD, minHeading, maxHeading, ignoreLinex)
{
    if(minHeading > maxHeading) return;
    
    inputMDLines = inputMD.split("\n");
    var outputMD = "";
    var anchorTracker = {};
    
    for(var i = 0; i < inputMDLines.length; ++i)
    {
        var inputMDLine = inputMDLines[i];
        var match = /^(#+) (.*)$/.exec(inputMDLine);
        if(match)
        {
            var headingLevel = match[1].length;
            var headingTitle = match[2].replace(/<.*?>/g, "");
            
            if(headingLevel < minHeading || headingLevel > maxHeading)
            {
                continue;
            }
            
            headingLevel -= minHeading;
            
            var headingAnchor = headingTitle.toLowerCase().replace(/[^_a-z0-9- ]/g, "").replace(/ /g, "-");
            
            if(headingAnchor in anchorTracker)
            {
                anchorTracker[headingAnchor]++;
                headingAnchor = headingAnchor + "-" + anchorTracker[headingAnchor];
            }
            else
            {
                anchorTracker[headingAnchor] = 0;
            }
            
            outputMD += " ".repeat(headingLevel * 2) + "- [" + headingTitle + "](#" + headingAnchor + ")\n";
        }
    }
    
    return outputMD;
}
