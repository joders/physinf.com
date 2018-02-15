// function is called for collapse on any child 
// so putting this on every div is very inefficient
//$('div').on("show.bs.collapse", function(e) {
$('body').on("show.bs.collapse", function(e) {
    var tsel=$(e.target)
    localStorage.setItem(tsel[0].id,"shown")
    var sel=tsel.find(".myPieChart");
    if(tsel.hasClass("myPieChart"))
        sel=sel.add(tsel);
    sel.each(function(index,el) {
        if($(el).parents().andSelf().filter(".collapse:not(.in)").not(tsel).length == 0)
            if(el.getElementsByTagName('svg').length == 0)
                createGraph(el);
    });
});

$('body').on("hidden.bs.collapse", function(e) {
    var tsel=$(e.target)
    localStorage.setItem(tsel[0].id,"hidden")
    var sel=tsel.find(".myPieChart");
    if(tsel.hasClass("myPieChart"))
        sel=sel.add(tsel);
    sel.each(function(index,el) {
        if($(el).parents().andSelf().filter(".collapse:not(.in)").length != 0)
            if(el.getElementsByTagName('svg').length != 0)
                el.getElementsByTagName('svg')[0].remove();
    });
});


var color_palette=["#7e3939","#7e6539","#7c7e39","#597e39","#397e46","#397e6a","#396a7e","#39517e","#4e397e","#7a397e"]
//$(".myPieChart").each(createGraph(obj))
var createGraph = function( obj ) {
    var pie = new d3pie(obj.id, {
        "header": {
            "title": {
                "text": $(obj).data().title,
                "fontSize": 22,
                "font": "verdana"
            },
            "subtitle": {
                "text": $(obj).data().subtitle,
                "color": "#999999",
                "fontSize": 10,
                "font": "verdana"
            },
            "titleSubtitlePadding": 12
        },
//        "footer": {
//            "text": "Source: me, my room, the last couple of months.",
//            "color": "#999999",
//            "fontSize": 11,
//            "font": "open sans",
//            "location": "bottom-center"
//        },
        "size": {
            "canvasHeight": 400,
            "canvasWidth": 590,
            "pieInnerRadius": "50%",
            "pieOuterRadius": "80%"
        },
        "data": {
            "content": $(obj).data().data.map(
                function(entry, index) {
                    return {
                        "label": entry[0],
                        "value": entry[1],
                        "color": color_palette[index%color_palette.length]
                    }
                }
            )
        },
        "labels": {
            "outer": {
                "pieDistance": 32
            },
            "inner": {
                "format": "value"
            },
            "mainLabel": {
                "font": "verdana"
            },
            "percentage": {
                "color": "#e1e1e1",
                "font": "verdana",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#e1e1e1",
                "font": "verdana"
            },
            "lines": {
                "enabled": true,
                "color": "#cccccc"
            },
            "truncation": {
                "enabled": true
            }
        },
        "effects": {
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        }
    });
};

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

$( document ).ready(function() {
    var retPos = localStorage.getItem("retPos")
    if(retPos != undefined) {
        localStorage.removeItem("retPos")
        $(".collapse").each(function() {
            if(localStorage.getItem($(this)[0].id)=="shown")
                $(this).collapse("show")
        })
      
        if($("#demo").hasClass("in") || $("#demo").hasClass("collapsing"))
          $("#experienceButton").html("Hide my experience")

        localStorage.removeItem("pos")
        if(window.location.href.indexOf("#")==-1)
            setTimeout(function() {
                document.body.scrollTop = retPos
            },200)
    } else {
        var temp = JSON.parse(localStorage.getItem('visited'));
        localStorage.clear(); 
        localStorage.setItem('visited', temp);
    }
})

//function setPos() {
//  localStorage.setItem("pos", document.body.scrollTop)
//}

function scrollPos() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
}

window.onscroll = function() {
//  setPos();
  if(scrollPos() > $("#advantagesDiv").offset().top) {
    $("#buttonMenu")[0].style.display = "inline";
    localStorage.setItem("visited", true);
    window.onscroll = null;//setPos;
  }
}

