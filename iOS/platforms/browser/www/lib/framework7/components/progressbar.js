(function framework7ComponentLoader(r,s){void 0===s&&(s=!0);document,window;var e=r.$,t=(r.Template7,r.utils),n=(r.device,r.support,r.Class,r.Modal,r.ConstructorMethods,r.ModalMethods,{set:function(){for(var r,s=[],t=arguments.length;t--;)s[t]=arguments[t];var n=this,a=s[0],o=s[1],i=s[2];if("number"==typeof s[0]&&(o=(r=s)[0],i=r[1],a=n.root),null==o)return a;o||(o=0);var p=e(a||n.root);if(0===p.length)return a;var g,h=Math.min(Math.max(o,0),100);if(0===(g=p.hasClass("progressbar")?p.eq(0):p.children(".progressbar")).length||g.hasClass("progressbar-infinite"))return g;var d=g.children("span");return 0===d.length&&(d=e("<span></span>"),g.append(d)),d.transition(void 0!==i?i:"").transform("translate3d("+(-100+h)+"%,0,0)"),g[0]},show:function(){for(var r,s,t=[],n=arguments.length;n--;)t[n]=arguments[n];var a=this,o=t[0],i=t[1],p=t[2],g="determined";2===t.length?"string"!=typeof t[0]&&"object"!=typeof t[0]||"string"!=typeof t[1]?"number"==typeof t[0]&&"string"==typeof t[1]&&(i=(s=t)[0],p=s[1],o=a.root):(o=(r=t)[0],p=r[1],i=r[2],g="infinite"):1===t.length?"number"==typeof t[0]?(o=a.root,i=t[0]):"string"==typeof t[0]&&(g="infinite",o=a.root,p=t[0]):0===t.length&&(g="infinite",o=a.root);var h,d=e(o);if(0!==d.length)return d.hasClass("progressbar")||d.hasClass("progressbar-infinite")?h=d:0===(h=d.children(".progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)")).length&&(h=e('\n          <span class="progressbar'+("infinite"===g?"-infinite":"")+(p?" color-"+p:"")+' progressbar-in">\n            '+("infinite"===g?"":"<span></span>")+"\n          </span>"),d.append(h)),void 0!==i&&a.progressbar.set(h,i),h[0]},hide:function(r,s){void 0===s&&(s=!0);var t,n=e(r||this.root);if(0!==n.length)return 0===(t=n.hasClass("progressbar")||n.hasClass("progressbar-infinite")?n:n.children(".progressbar, .progressbar-infinite")).length||!t.hasClass("progressbar-in")||t.hasClass("progressbar-out")?t:(t.removeClass("progressbar-in").addClass("progressbar-out").animationEnd((function(){s&&t.remove()})),t)}}),a={name:"progressbar",create:function(){t.extend(this,{progressbar:{set:n.set.bind(this),show:n.show.bind(this),hide:n.hide.bind(this)}})},on:{tabMounted:function(r){var s=this;e(r).find(".progressbar").each((function(r,t){var n=e(t);s.progressbar.set(n,n.attr("data-progress"))}))},pageInit:function(r){var s=this;r.$el.find(".progressbar").each((function(r,t){var n=e(t);s.progressbar.set(n,n.attr("data-progress"))}))}},vnode:{progressbar:{insert:function(r){var s=r.elm;this.progressbar.set(s,s.getAttribute("data-progress"))},update:function(r){var s=r.elm;this.progressbar.set(s,s.getAttribute("data-progress"))}}}};if(s){if(r.prototype.modules&&r.prototype.modules[a.name])return;r.use(a),r.instance&&(r.instance.useModuleParams(a,r.instance.params),r.instance.useModule(a))}return a}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
