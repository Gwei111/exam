var HtmlUtil = {
	// 省略上次代码...
	
	// 3.使用正则实现html编码
	htmlEncodeByRegExp: function(str:any) {
		var s = '';
		if(str.length === 0) {
			return '';
		}
		s = str.replace(/&/g,'&amp;');
		s = s.replace(/</g,'&lt;');
		s = s.replace(/>/g,'&gt;');
		s = s.replace(/ /g,'&nbsp;');
		s = s.replace(/\'/g,'&#39;');
		s= s.replace(/\"/g,'&quot;');
		return s;
	},
	
	// 4.使用正则实现html解码
	htmlDecodeByRegExp: function(str:any) {
		var s = '';
		if(str.length === 0) {
			return '';
		}
		s = str.replace(/&amp;/g, '&');
		s = s.replace(/&lt;/g,'<');
		s = s.replace(/&gt;/g,'>');
		s = s.replace(/&nbsp;/g,' ');
		s = s.replace(/&#39;/g,'\'');
		s = s.replace(/&quot;/g,'\"');
		return s;
	}
}

export {HtmlUtil}