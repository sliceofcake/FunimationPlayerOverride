# FunimationPlayerOverride  
Get all of Funimation's clutter out of the way of the video. Also, improve subtitles appearance.  
  
Run this JavaScript in your browser when viewing a Funimation video player page to:  
• allow the hiding of the clutter in front of the video (clicking the video area will hide/show the clutter)  
• improve subtitles appearance  
• new keyboard shortcut: [f] toggle fullscreen  
• new keyboard shortcut: [left] skip backward by 1s  
• new keyboard shortcut: [right] skip forward by 1s  
• new keyboard shortcut: [s] skip forward by 1m:30s, which is the length of OPs and EDs  
  
Remember that you already have some shortcuts:  
• [space] play/pause  
• [up] increase volume  
• [down] decrease volume  
  
You can also create a bookmark with the URL/link being the funimationPlayerOverride.txt text. Then, whenever you click on the bookmark, it will run the script. Bookmarks that run JavaScript instead of going to a webpage are called bookmarklets.  
  
Why this works  
Recently [end of 2016, beginning of 2017], Funimation decided to redo their website and, for whatever reason, decided to use an HTML5 video player instead of their traditional Flash video player. This allows for customer scripting - abilities that were previously made difficult because the video was sitting behind Flash.  
  
Touchy notes:  
• This script makes some assumptions about how Funimation's video player is laid out. If the layout changes in the future, this script will likely not work as intended until it is revised.  
• This script was tested narrowly on a Macbook Pro running Chrome. Different browsers / operating systems / screen sizes may yield unintended results.  