function tocIt(inputMD, minHeading, maxHeading, ignoreLinex)
{
    if(minHeading > maxHeading) return;

    inputMDLines = inputMD.split("\n");
    var outputMD = "";
    var anchorTracker = {};
    var codeTagEndExpected = false;

    for(var i = 0; i < inputMDLines.length; ++i)
    {
        var inputMDLine = inputMDLines[i];

        var codeTag = /^(`{3})(shell)?$/.exec(inputMDLine);
        if(codeTag)
        {
            codeTagEndExpected = !codeTagEndExpected;
            continue;
        }

        var match = /^(#+) (.*)$/.exec(inputMDLine);
        if(!codeTagEndExpected && match)
        {
            var headingLevel = match[1].length;
            var headingTitle = match[2].replace(/<.*?>/g, "");

            if(headingLevel < minHeading || headingLevel > maxHeading)
            {
                continue;
            }

            headingLevel -= minHeading;
          
            var headingAnchor = headingTitle.toLowerCase().replace(/[^_0-9a-z\xE0-\xFF- ]/g, "").replace(/ /g, "-");
          
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
