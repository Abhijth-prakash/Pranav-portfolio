/* Pranav Unnikrishnan portfolio. Interactions: hero slideshow, project index with hover preview, filters, lightbox, atlas map, copy buttons. Data lives in data.js. */
const $=s=>document.querySelector(s);

/* hero */
const hero=$("#hero"),bars=$("#bars");
HERO.forEach(([k,t],i)=>{
  const d=document.createElement("div");d.className="slide"+(i?"":" on");
  d.innerHTML=`<img src="images/${k}.jpg" alt="${t} render" ${i?'loading="lazy"':''}>`;
  hero.insertBefore(d,hero.firstChild);
  const b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Show "+t);b.onclick=()=>go(i,true);bars.appendChild(b);
});
const slides=[...hero.querySelectorAll(".slide")].reverse();
let cur=0,timer;
function go(i,user){
  slides[cur].classList.remove("on");cur=i;slides[cur].classList.add("on");
  $("#nowT").textContent=HERO[i][1];$("#nowL").textContent=HERO[i][2];
  [...bars.children].forEach((b,j)=>{b.classList.remove("on");b.classList.toggle("done",j<i);});
  void bars.children[i].offsetWidth;bars.children[i].classList.add("on");
  clearTimeout(timer);timer=setTimeout(()=>go((cur+1)%HERO.length),6000);
}
go(0);

/* ribbon */
const words=["Concept design","master planning","Themed zoning","AI visualisation","3D modelling","design narrative","Floor plans","investor pitch decks","Site analysis","leisure & hospitality"];
$("#ribbon").innerHTML=[...words,...words].map(w=>`<span>${w}</span>`).join("");

/* index + projects */
const idx=$("#index"),wrapP=$("#projects");
P.forEach(p=>{
  const a=document.createElement("a");a.className="row";a.href="#"+p.id;a.dataset.cat=p.cat;a.dataset.img=p.img[0][0];
  a.innerHTML=`<h3>${p.name}</h3><span class="c">${p.place}</span><span class="c">${p.type}</span><span class="pill ${p.st}">${p.status}</span>`;
  idx.appendChild(a);
  const s=document.createElement("section");s.className="proj";s.id=p.id;
  const parts=p.name.split(" & ");
  s.innerHTML=`<div class="wrap">
    <div class="p-head">
      <h2>${p.name}<span class="serif">${p.place}</span></h2>
      <div class="p-meta">
        <p>${p.text}</p>
        <dl class="facts">
          <dt>Type</dt><dd>${p.type}</dd>
          <dt>Status</dt><dd><span class="pill ${p.st}" style="justify-self:start">${p.status}</span></dd>
          <dt>Location</dt><dd class="coord">${p.coord}</dd>
          <dt>Renders</dt><dd>${p.img.length} images · click to enlarge</dd>
        </dl>
      </div>
    </div>
    <div class="mosaic">${p.img.map(([k,c,cls],i)=>`<button type="button" class="tile ${cls}" data-p="${p.id}" data-i="${i}" aria-label="Enlarge: ${c}"><img src="images/${k}.jpg" alt="${c}" loading="lazy"><span class="cap">${c}</span></button>`).join("")}</div>
  </div>`;
  wrapP.appendChild(s);
});

/* filter */
document.querySelectorAll("#chips button").forEach(b=>b.addEventListener("click",()=>{
  const f=b.dataset.f;document.querySelectorAll("#chips button").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));
  idx.querySelectorAll(".row").forEach(r=>{r.hidden=!(f==="all"||r.dataset.cat===f);});
  P.forEach(p=>{document.getElementById(p.id).hidden=!(f==="all"||p.cat===f);});
}));

/* hover peek */
const peek=$("#peek"),peekImg=$("#peekImg");
if(matchMedia("(hover:hover) and (pointer:fine)").matches){
  idx.addEventListener("mousemove",e=>{peek.style.left=e.clientX+"px";peek.style.top=e.clientY+"px";});
  idx.querySelectorAll(".row").forEach(r=>{
    r.addEventListener("mouseenter",()=>{peekImg.src="images/"+r.dataset.img+".jpg";peek.classList.add("show");});
    r.addEventListener("mouseleave",()=>peek.classList.remove("show"));
  });
}

/* lightbox */
const lb=$("#lb");let lbSet=[],lbI=0,lastFocus;
function lbShow(){const [k,c]=lbSet[lbI];$("#lbImg").src="images/"+k+".jpg";$("#lbImg").alt=c;$("#lbCap").textContent=c;$("#lbCount").textContent=(lbI+1)+" / "+lbSet.length;}
document.addEventListener("click",e=>{
  const t=e.target.closest(".tile");if(!t)return;
  const p=P.find(x=>x.id===t.dataset.p);lbSet=p.img.map(([k,c])=>[k,p.name+" — "+c]);lbI=+t.dataset.i;lastFocus=t;
  lbShow();lb.hidden=false;document.body.style.overflow="hidden";$("#lbClose").focus();
});
function lbClose(){lb.hidden=true;document.body.style.overflow="";lastFocus&&lastFocus.focus();}
$("#lbClose").onclick=lbClose;
$("#lbPrev").onclick=()=>{lbI=(lbI-1+lbSet.length)%lbSet.length;lbShow();};
$("#lbNext").onclick=()=>{lbI=(lbI+1)%lbSet.length;lbShow();};
lb.addEventListener("click",e=>{if(e.target===lb||e.target.classList.contains("lb-stage"))lbClose();});
document.addEventListener("keydown",e=>{if(lb.hidden)return;if(e.key==="Escape")lbClose();if(e.key==="ArrowRight")$("#lbNext").click();if(e.key==="ArrowLeft")$("#lbPrev").click();});

/* atlas */
(function(){
  const W=1000,H=420,L0=-95,L1=125,A0=-35,A1=50;
  const x=l=>(l-L0)/(L1-L0)*W, y=a=>(A1-a)/(A1-A0)*H;
  const base=[25.20,55.27];
  const pts=[
    ["Vietnam · 2 projects",21.2,106.2,"on",10,-12,"start"],
    ["Thailand · 2 projects",12.93,100.88,"on",10,18,"start"],
    ["Andover, USA",42.66,-71.14,"on",0,-16,"middle"],
    ["São Roque, Brazil",-23.53,-47.13,"on",0,24,"middle"],
    ["Phu Quoc",10.23,103.96,"co",-10,22,"end"],
    ["Qiddiya",24.6,46.3,"co",-12,4,"end"],
    ["Gitanga",-1.29,36.82,"co",12,5,"start"]
  ];
  let g="";
  for(let l=-90;l<=120;l+=30){g+=`<line x1="${x(l)}" y1="0" x2="${x(l)}" y2="${H}" stroke="#2A2D2B" stroke-width="1"/><text x="${x(l)+4}" y="${H-8}" fill="#6F6B64" font-family="IBM Plex Mono, monospace" font-size="10">${Math.abs(l)}°${l<0?"W":"E"}</text>`;}
  for(let a=-30;a<=45;a+=15){g+=`<line x1="0" y1="${y(a)}" x2="${W}" y2="${y(a)}" stroke="#2A2D2B" stroke-width="1"${a===0?' stroke-dasharray="2 4"':''}/><text x="6" y="${y(a)-5}" fill="#6F6B64" font-family="IBM Plex Mono, monospace" font-size="10">${a===0?"Equator":Math.abs(a)+"°"+(a<0?"S":"N")}</text>`;}
  const bx=x(base[1]),by=y(base[0]);let arcs="",dots="";
  pts.forEach(([n,a,l,k,dx,dy,an])=>{
    const px=x(l),py=y(a),mx=(bx+px)/2,my=Math.min(by,py)-Math.abs(px-bx)*.25-20;
    const col=k==="on"?"#5CC8BA":"#E2B85E";
    arcs+=`<path class="arc" d="M${bx},${by} Q${mx},${my} ${px},${py}" fill="none" stroke="${col}" stroke-opacity=".55" stroke-width="1.2"/>`;
    dots+=`<circle cx="${px}" cy="${py}" r="9" fill="${col}" fill-opacity=".35" class="pulse"/><circle cx="${px}" cy="${py}" r="4.5" fill="${col}"/><text x="${px+dx}" y="${py+dy}" text-anchor="${an}" fill="#ECE6DA" font-family="Manrope, Arial, sans-serif" font-size="13" font-weight="600">${n}</text>`;
  });
  dots+=`<circle cx="${bx}" cy="${by}" r="16" fill="#5CC8BA" fill-opacity=".25" class="pulse"/><circle cx="${bx}" cy="${by}" r="7" fill="#ECE6DA"/><circle cx="${bx}" cy="${by}" r="13" fill="none" stroke="#ECE6DA" stroke-width="1"/><text x="${bx}" y="${by-22}" text-anchor="middle" fill="#ECE6DA" font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="1.5">DUBAI · BASE</text><text x="${bx}" y="${by+30}" text-anchor="middle" fill="#5CC8BA" font-family="Manrope, Arial, sans-serif" font-size="13" font-weight="600">UAE &amp; Oman · 9 projects</text>`;
  $("#map").innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of project locations from Dubai: UAE, Oman, Vietnam, Thailand, the USA and Brazil"><rect width="${W}" height="${H}" fill="none"/>${g}${arcs}${dots}</svg>`;
})();

/* header + progress */
const topBar=$("#top"),prog=$("#progress");
function onScroll(){const s=scrollY,h=document.documentElement.scrollHeight-innerHeight;topBar.classList.toggle("solid",s>40);prog.style.width=(h>0?s/h*100:0)+"%";}
addEventListener("scroll",onScroll,{passive:true});onScroll();

/* copy */
document.querySelectorAll("[data-copy]").forEach(b=>b.addEventListener("click",()=>{
  const el=document.getElementById(b.dataset.copy),txt=el.textContent;
  const done=()=>{b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1600);};
  try{navigator.clipboard.writeText(txt).then(done,()=>sel(el));}catch(e){sel(el);}
  function sel(n){const r=document.createRange();r.selectNodeContents(n);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="Selected";}
}));
