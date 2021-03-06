/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
/*

Modified for use with PrototypeJS

http://github.com/jwestbrook/bootstrap-prototype


*/

"use strict";

if(BootStrap === undefined)
{
	var BootStrap = {};
}


 /* BUTTON PUBLIC CLASS DEFINITION
	* ============================== */
BootStrap.Button = Class.create({
	initialize : function (element, options) {
		element.store('bootstrap:button',this)
		this.$element = $(element)
		if(typeof options == 'object')
		{
			this.options = options
			this.options.loadingText = (typeof this.options.loadingText != 'undefined') ? options.loadingText : ''
		} else if(typeof options != 'undefined' && options == 'toggle') {
			this.toggle()
		} else if (typeof options != 'undefined'){
			this.setState(options)
		}

	},
	setState : function (state) {
		var d = 'disabled'
		, $el = this.$element
		, val = $el.readAttribute('type') == 'input' ? 'value' : 'innerHTML'

		state = state + 'Text'
		$el.readAttribute('data-reset-text') || $el.writeAttribute('data-reset-text',$el[val])

		$el[val] = ($el.readAttribute('data-'+state.underscore().dasherize()) || (this.options && this.options[state]) || '')

		// push to event loop to allow forms to submit
		setTimeout(function () {
			state == 'loadingText' ?
			$el.addClassName(d).writeAttribute(d,true) :
			$el.removeClassName(d).writeAttribute(d,false)
		}, 0)
	},
	toggle : function () {
		var $parent = this.$element.up('[data-toggle="buttons-radio"]')

		$parent && $parent
		.select('.active')
		.invoke('removeClassName','active')

		this.$element.toggleClassName('active')
	}
});


/*domload*/

document.observe("dom:loaded",function(){
	$$("[data-toggle^=button]").invoke("observe","click",function(e){
		var $btn = e.findElement()
		if(!$btn.hasClassName('btn')) $btn = $btn.up('.btn')
		new BootStrap.Button($btn,'toggle')
	});
})