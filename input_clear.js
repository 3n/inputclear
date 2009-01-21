/*
Script: InputClear.js
	Adds an "(X)" button inside of an INPUT that will clear the input if you click it.
	Works great on iPhone. 
*/

var InputClear = new Class({
	
	Implements: Options,
	
	options: {
		input_zindex			: 10,
		button_zindex			: 20, 
		font_family				: 'Helvetica', 
		border_radius			: 5,
		background_color 	: '#ccc',
		color							: 'white', 
		spacing						: 3,
		auto_hide					: true
	},
	
	initialize: function(elem, options){
		this.setOptions(options);
		this.element = elem.setStyle('z-index', this.options.input_zindex);		
		
		try {
			this.element_invisible_dimensions = new InvisibleDimensions(this.element);			
		}catch(e){
			this.element_invisible_dimensions = this.element;
		}
				
		var desired_height = this.element_invisible_dimensions.getSize().y - this.options.spacing*2
		
		this.button = new Element('a', {
			'styles': {
				'margin-left'						: -(desired_height + this.options.spacing) + 'px',
				'margin-top'						: -((desired_height/2) + this.options.spacing) + 'px',
				'margin-right'					: this.options.spacing + 'px',
				'position'							: 'relative',				
				'-webkit-border-radius'	: this.options.border_radius + 'px',
				'-moz-border-radius'		: this.options.border_radius + 'px',				
				'background-color'			: this.options.background_color,
				'text-align'						: 'center',
				'font-family'						: this.options.font_family,
				'font-size'							: '14px',
				'color'									: this.options.color,
				'text-shadow'						: 'none',
				'z-index'								: this.options.button_zindex,
				'font-weight'						: 'bold'
			}
		}).set('html','x').inject(this.element, 'after');
		
		try {
			this.button_invisible_dimensions 	= new InvisibleDimensions(this.button);
		}catch(e){
			this.button_invisible_dimensions = this.button;
		}
		
		var padding = ((desired_height - this.button_invisible_dimensions.getSize().x)/2) + 'px';
		this.button.setStyle('padding-left', 	padding);
		this.button.setStyle('padding-right', padding);
		this.button.setStyle('padding-top', 	'1px');
		this.button.setStyle('padding-bottom','3px');

		this.button.simple_hide();
		this.show_if_text();
		
		this.add_events();		
		return this;
	}, 
	
	add_events: function(){
		this.button.addEvent('click', this.do_clear.bind(this));
		this.element.addEvent('blur', this.show_if_text.bind(this));
		if (this.options.auto_hide) this.element.addEvent('focus',this.button.simple_hide.bind(this.button));
		return this;
	},
	
	do_clear: function(){
		this.element.set('value','');
		if (this.options.auto_hide) this.button.simple_hide();
		return this;
	},
	
	show_if_text: function(){
		if (!this.element.get('value').is_empty(true)) this.button.simple_show('inline');		
		return this;
	}
});
