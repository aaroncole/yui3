/**
 * CanvasAPI provides an api for drawing objects within the dom.
 */
function CanvasAPI(config)
{
	CanvasAPI.superclass.constructor.apply(this, arguments);
}

CanvasAPI.NAME = "canvasAPI";

CanvasAPI.ATTRS = {
	parent: {
		getter: function()
		{
			return this._parent;
		},

		setter: function(value)
		{
			if(Y.Lang.isString(value))
			{
				this._parent = document.getElementById(value);
			}
			else
			{
				this._parent = value;
			}
			return this._parent;
		}
	},

	canvas: {
		getter: function() {
			if(!this._canvas)
			{
				this._setCanvas();
			}
			return this._canvas;
		}
	},

	context: {
		getter: function() {
			if(!this._context)
			{
				this._context = this.get("canvas").getContext("2d");
			}
			return this._context;
		}
	},

    x: {
        getter: function()
        {
            return this._x;
        },

        setter: function(val)
        {
            this._x = val;
            return val;
        },

        validator: function(val)
        {
            return Y.Lang.isNumber(val);
        }
    },

    y: {
        getter: function()
        {
            return this._y;
        },

        setter: function(val)
        {
            this._y = val;
            return val;
        },

        validator: function(val)
        {
            return Y.Lang.isNumber(val);
        }
    },

    fillColor: {
        getter: function()
        {
            return this._fillColor;
        },

        setter: function(val)
        {
            this._fillColor = val;
            return val;
        }
    },

    fillAlpha: {
        getter: function()
        {
            return this._fillAlpha;
        },

        setter: function(val)
        {
            this._fillAlpha = val;
            return val;
        }
    },

    lineColor: {
        getter: function()
        {
            return this._lineColor;
        },

        setter: function(val)
        {
            this._lineColor = val;
            return val;
        }
    },

    lineWidth: {
        getter: function()
        {
            return this._lineWidth;
        },

        setter: function(val)
        {
            this._lineWidth = val;
            return val;
        },

        validator: function(val)
        {
            return Y.Lang.isNumber(val);
        }
    },

    lineAlpha: {
        getter: function()
        {
            return this._lineAlpha;
        },

        setter: function(val)
        {
            this._lineAlpha = val;
            return val;
        },

        validator: function(val)
        {
            return Y.Lang.isNumber(val);
        }
    },

    fillType: {
        getter: function()
        {
            return this._fillType;
        },

        setter: function(val)
        {
            this._fillType = val;
            return val;
        },

        validator: function(val)
        {
            return (val === "solid" || val === "linear" || val === "radial");
        }
    }
};

Y.extend(CanvasAPI, Y.Base, {
	_setCanvas: function()
	{
		var parent = this.get("parent");
		this._canvas = document.createElement("canvas");
		this._canvas.width = parseInt(this._parent.style.width, 10) || parent.width;
		this._canvas.height = parseInt(this._parent.style.height, 10) || parent.height;
		this._context = this._canvas.getContext("2d");
		parent.appendChild(this._canvas);
	},

    /**
     * @private
     * Storage for canvas
     */
	_canvas: null,

    /**
     * @private
     * Storage for context
     */
	_context: null,

    /**
     * @private
     * Storage for fillType
     */
    fillType: "solid",

    /**
     * @private
     * Storage for x.
     */
    _x: 0,

    /**
     * @private
     * Storage for y.
     */
    _y: 0,

    /**
     * @private
     * Storage for fillColor.
     */
    _fillColor: null,

    /**
     * @private
     * Storage for fillAlpha.
     */
    _fillAlpha: 1,

    /**
     * @private
     * Storage for lineColor.
     */
    _lineColor: null,

    /**
     * @private
     * Storage for lineWidth.
     */
    _lineWidth: 1,

    /**
     * @private
     * Storage for lineAlpha.
     */
    _lineAlpha: 1,

    /** 
     *Specifies a simple one-color fill that subsequent calls to other Graphics methods (such as lineTo() or drawCircle()) use when drawing.
     */
    beginFill: function(color, alpha)
    {
        var ctx = this.get("context");
        this.set("fillColor", color);
        this.set("fillAlpha", alpha);
        ctx.beginPath();
        ctx.fillStyle = color;
    },
	
    /** 
     *Specifies a gradient fill used by subsequent calls to other Graphics methods (such as lineTo() or drawCircle()) for the object.
     */
    beginGradientFill: function(type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio)
    {
    },

    /** 
     *Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
     */
    clear: function()
    {
        this.set("fillColor", null);
        this.set("lineColor", null);
        this.set("lineWidth", 1);
        this.set("fillAlpha", 1);
        this.set("lineAlpha", 1);
   },
	
    /** 
     *Draws a curve using the current line style from the current drawing position to (anchorX, anchorY) and using the control point that (controlX, controlY) specifies.
     */
    curveTo: function(cp1x, cp1y, cp2x, cp2y, x, y)
    {
        var ctx = this.get("context");
        ctx.bezierCurveTo(arguments);
    },

    /** 
     *Draws a circle.
     */
	drawCircle: function(x, y, radius)
	{
		var startAngle = 0,
			endAngle = 360,
			anticlockwise = false,
			sc = this.get("lineColor"),
			lw = this.get("lineWidth"),
			fc = this.get("fillColor"),
			ctx = this.get("context");
		startAngle *= (Math.PI/180);
		endAngle *= (Math.PI/180);
        ctx.arc(x + radius, y + radius, radius, startAngle, endAngle, anticlockwise);
	},

    /** 
     *Draws an ellipse.
     */
    drawEllipse: function(x, y, width, height)
    {
    },
	
    /** 
     *Draws a rectangle.
     */
    drawRectangle: function(x, y, w, h)
	{
		var lw = this.get("lineWidth"),
			fc = this.get("fillColor"),
			sc = this.get("lineColor"),
			ctx = this.get("context");
			if(fc)
			{
				ctx.fillRect(x, y, w, h);
			}
			if(sc)
			{
				ctx.strokeRect(x, y, w, h);
			}
	},
	
    /** 
     *Draws a rounded rectangle.
     */
    drawRoundRect: function(x, y, w, h, ew, eh)
    {
		var lw = this.get("lineWidth"),
			fc = this.get("fillColor"),
			sc = this.get("lineColor"),
			ctx = this.get("context");
			ctx.moveTo(x, y + eh);
            ctx.lineTo(x, y + h - eh);
            ctx.quadraticCurveTo(x, y + h, x + ew, y + h);
            ctx.lineTo(x + w - ew, y + h);
            ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
            ctx.lineTo(x + w, y + eh);
            ctx.quadraticCurveTo(x + w, y, x + w - ew, y);
            ctx.lineTo(x + ew, y);
            ctx.quadraticCurveTo(x, y, x, y + eh);
    },
        
    /** 
     *Applies a fill to the lines and curves that were added since the last call to the beginFill() or beginGradientFill() method.
     */
    endFill: function()
    {
        var ctx = this.get("context");
		if(this.get("lineColor"))
		{
			ctx.stroke();
		}
		if(this.get("fillColor"))
		{
            ctx.fill();
		}
    },

    /** 
     *Specifies a gradient to use for the stroke when drawing lines.
     */
    lineGradientStyle: function(type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio)
    {
    },
        
    /** 
     *Specifies a line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
     */
    lineStyle: function(thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit)
    {
        var ctx = this.get("context");
        this.set("lineWidth", thickness);
        this.set("lineColor", color);
        this.set("lineAlpha", alpha);
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
    },
    
    /** 
     *Draws a line using the current line style from the current drawing position to (x, y); the current drawing position is then set to (x, y).
     */
    lineTo: function(x, y)
    {
        var ctx = this.get("context");
        ctx.lineTo(x, y);
        this.set("x", x);
        this.set("y", y);
    },
    
    /** 
     * Moves the current drawing position to (x, y).
     */
    moveTo: function(x, y)
    {
        var ctx = this.get("context");
        ctx.moveTo(x, y);
        this.set("x", x);
        this.set("y", y);
    }
});

Y.CanvasAPI = CanvasAPI;