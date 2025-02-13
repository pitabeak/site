objects = {
	wingame: {
		desc: "This is an escape room game.",
		exits: [ "west","wingame","east","I can't go that way." ],
	},
	door2: {
		name: "a broken door",
	},
	ball1: {
		parent: "wingame",
		name: "a ball",
	},
	door1: {
		parent: "wingame",
		name: "the front door",
		look: "It's closed and locked.",
		use: function() {
			if(eqid == "banana1") {
				objects[eqid].parent = null;
				objects.door1.parent = null;
				objects.door2.parent = rmid;
				eqid = null;
				return "I throw the banana really hard at the door knob. It breaks! The door slides open.";
			}
		}
	},
	banana1: {
		parent: "inven",
		name: "a frozen banana",
	},
};

let rmid,eqid,msg;

function addExit(e,k,s) {
	e.insertAdjacentHTML("beforeend",`<span><span onclick="mymodule.onClick(1,${k})"></span></span>`);
	e.lastChild.firstChild.textContent = s;
}

function addObject(e,n,k) {
	e.insertAdjacentHTML("beforeend",`<span><span onclick="mymodule.onClick(${n},'${k}')"></span></span>`);
	e.lastChild.firstChild.textContent = objects[k].name;
}

function show() {
	let rm = objects[rmid];
	for(let e of document.querySelectorAll("body>*")) {
		e.innerHTML = "";
	}
	let e1 = document.querySelector("#desc");
	e1.textContent = rm.desc;
	e1 = document.querySelector("#message");
	e1.textContent = msg;
	msg = null;
	e1 = document.querySelector("#exits");
	let a = rm.exits;
	if(a) {
		for(let i = 0; i < a.length; i += 2) {
			addExit(e1,i+1,a[i]);
		}
	}
	if(eqid) {
		let e = document.querySelector("#equip");
		addObject(e,2,eqid);
	}
	e1 = document.querySelector("#objects");
	let e2 = document.querySelector("#inven");
	for(let k in objects) {
		let p = objects[k].parent;
		if(p == rmid) {
			addObject(e1,3,k);
		} else if(p == "inven" && k != eqid) {
			addObject(e2,4,k);
		}
	}
}

window.mymodule = {
	onLoad: function() {
		rmid = "wingame";
		show();
	},
	onClick: function(n,k) {
		switch(n) {
		case 1:
			k = objects[rmid].exits[k];
			if(k in objects) {
				rmid = k;
			} else {
				msg = k;
			}
			show();
			break;
		case 2:
			eqid = null;
			show();
			break;
		case 3: {
			let v = objects[k];
			msg = v.use && (v.use)() || v.look;
			show();
			break;
		}
		case 4:
			eqid = k;
			show();
			break;
		}
	},
};