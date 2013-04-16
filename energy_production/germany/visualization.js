//Angaben in GWh
var data = {
    wasserkraft: {
        "2000": 29,
            "2001": 28,
            "2002": 28,
            "2003": 24,
            "2004": 27,
            "2005": 27,
            "2006": 27,
            "2007": 28,
            "2008": 27,
            "2009": 25,
            "2010": 27,
            "2011": 24,
    },
    kernkraft: {
        "2000": 170,
            "2001": 171,
            "2002": 165,
            "2003": 165,
            "2004": 167,
            "2005": 163,
            "2006": 167,
            "2007": 141,
            "2008": 149,
            "2009": 135,
            "2010": 141,
            "2011": 108
    },
    fossil: {
        "2000": 347,
            "2001": 355,
            "2002": 358,
            "2003": 376,
            "2004": 371,
            "2005": 371,
            "2006": 373,
            "2007": 383,
            "2008": 371,
            "2009": 342,
            "2010": 358,
            "2011": 352
    },
    regenerativ: {
        "2000": 22,
            "2001": 22,
            "2002": 20,
            "2003": 24,
            "2004": 25,
            "2005": 33,
            "2006": 39,
            "2007": 46,
            "2008": 50,
            "2009": 52,
            "2010": 65,
            "2011": 77
    },
    gesamt: {
        "2000": 577,
            "2001": 586,
            "2002": 587,
            "2003": 607,
            "2004": 615,
            "2005": 621,
            "2006": 637,
            "2007": 637,
            "2008": 637,
            "2009": 592,
            "2010": 628,
            "2011": 609
    }
};

var maxGesamt = 637; //Overall maximum energy production value

window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 400);
    
    var jahr = 2011;
    
    paper.customAttributes.arc = function (xloc, yloc, value, total, R) {
    
    
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = xloc + R * Math.cos(a),
            y = yloc - R * Math.sin(a),
            path;
        if (total == value) {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
            ];
        } else {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, +(alpha > 180), 1, x, y]
            ];
        }
        return {
            path: path
        };
    };
    kernkraft = paper.path().attr({
        'arc': [150, 220, 100, 200, 200],
            'stroke': '#FFFF0F',
            'stroke-width': 10
    }).rotate(-90);
    
    wasserkraft = paper.path().attr({
        'arc': [160, 230, 100, 200, 180],
            'stroke': '#CCFFFF',
            'stroke-width': 10
    }).rotate(-90);
    
    fossil = paper.path().attr({
        'arc': [170, 240, 100, 200, 160],
            'stroke': '#CC0000',
            'stroke-width': 10
    }).rotate(-90);
    
    regenerativ = paper.path().attr({
        'arc': [180, 250, 100, 200, 140],
            'stroke': '#00CC00',
            'stroke-width': 10
    }).rotate(-90);
    
    gesamt = paper.rect(45, 340, 410, 20).attr({
        'stroke': '#FF8800',
            'fill': '#FFCC00'
    });
    
    paper.text(80, 40, "Click on a year").attr({
        'stroke': '#fff'
    });
    
    var yearLabels = {};
    for (var i = 0; i < 12; i++) {
        (function (i) {
            yearLabels[""+(2011-i)] = paper.text(60 + (i * 30), 60, "" + (2011 - i)).attr({
                'stroke': '#ffffff'
            }).click(function () {
                setJahr(2011 - i);
            });
        })(i);
    }
    
    var tGesamt = paper.text(105, 350, "Gesamt").attr({
        'stroke': '#883300',
            'font-size': '12px'
    });
    
    paper.text(140, 380, "Quelle: Bundesministerium für Wirtschaft").attr({
        'stroke': '#fff'
    });
    
    paper.text(70, 330, "Kernkraft").attr({
        'stroke': '#FFFF0F',
            'font-size': "12px"
    });
    paper.text(150, 330, "Wasserkraft").attr({
        'stroke': '#CCFFFF',
            'font-size': "12px"
    });
    paper.text(230, 330, "Fossile").attr({
        'stroke': "#FF000F",
            'font-size': "14px"
    });
    paper.text(320, 330, "Regenerative").attr({
        'stroke': "#00CC0F",
            'font-size': "14px"
    });
    
    setJahr = function (nJahr) {
        jahr = nJahr + "";
        
        yearLabels[jahr].attr("stroke", "#ff0");
        for(var label in yearLabels) {
            if(!yearLabels.hasOwnProperty(label) || label === jahr) {
                continue;
            }
            yearLabels[label].attr("stroke", "#fff");
        }
        
        kernkraft.animate({
            arc: [
            150, 220,
            100 * (data.kernkraft[jahr] / data.gesamt[jahr]), 200,
            200]
        }, 1000, 'bounce');
    
        wasserkraft.animate({
            arc: [
            160, 230,
            100 * (data.wasserkraft[jahr] / data.gesamt[jahr]), 200,
            180]
        }, 1000, 'bounce');
    
        fossil.animate({
            arc: [
            170, 240,
            100 * (data.fossil[jahr] / data.gesamt[jahr]), 200,
            160]
        }, 1000, 'bounce');
    
        regenerativ.animate({
            arc: [
            180, 250,
            100 * (data.regenerativ[jahr] / data.gesamt[jahr]), 200,
            140]
        }, 1000, 'bounce');
    
        gesamt.animate({
            'width': 410 * (data.gesamt[jahr] / maxGesamt)
        }, 1000, 'bounce');
    
        tGesamt.attr("text", "Gesamt: " + data.gesamt[jahr] + " TWh");
    }
    
    setJahr(jahr);
};