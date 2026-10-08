import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const VERSION=JSON.parse(fs.readFileSync('package.json','utf8')).version, APP_ID=`FVS-UNIFICADO-${VERSION}`;
const read=name=>fs.readFileSync(path.join(process.cwd(),name),'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg)};
try{
 for(const name of ['index.html','config.js','pwa.js','sw.js','version.json','manifest.webmanifest','render.yaml','package.json','scripts/check.mjs','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png','icons/favicon-32.png'])assert(fs.existsSync(name),`Arquivo ausente: ${name}`);
 const index=read('index.html'),pwa=read('pwa.js'),sw=read('sw.js');
 assert(JSON.parse(read('version.json')).version===VERSION,'Versão JSON divergente');
 assert(JSON.parse(read('version.json')).app===APP_ID,'Identificador divergente');
 assert(JSON.parse(read('package.json')).version===VERSION,'Versão package divergente');
 assert(index.includes(`const APP_VERSION='${APP_ID}';`),'Versão HTML divergente');
 assert(pwa.includes(`const LOCAL_VERSION = '${VERSION}';`),'Versão instalador divergente');
 assert(sw.includes(`const VERSION = '${VERSION}';`),'Versão SW divergente');
 for(const name of ['config.js','pwa.js','sw.js'])new vm.Script(read(name),{filename:name});
 for(const m of index.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi))if(!/\bsrc\s*=|\btype\s*=/.test(m[1]))new vm.Script(m[2],{filename:'index.html'});
 const catalogLine=index.split(String.fromCharCode(10)).find(line=>line.startsWith("const CATALOGS="));
 const catalogs=JSON.parse(catalogLine.trim().slice("const CATALOGS=".length,-1));
 assert(catalogs.lotus.items.length===158,'Escopo Lótus incompleto');
 assert(catalogs.solaris.items.length===28,'Escopo DIFELIX incompleto');
 for(const c of Object.values(catalogs))for(const s of c.items)assert(s.checks?.length>0,`FVS ausente: ${s.code}`);

 const workLine=index.split(String.fromCharCode(10)).find(line=>line.startsWith("const FALLBACK_OBRAS="));
 const works=JSON.parse(workLine.trim().slice("const FALLBACK_OBRAS=".length,-1));
 assert(works.map(w=>w.CODIGO).join(',')==='L2,S1,S2,S3,S4,S5,S6','Obras divergentes');
 const manifest=JSON.parse(read('manifest.webmanifest'));
 assert(manifest.scope==='./'&&manifest.start_url==='./','Manifesto não aceita subpasta');
 assert(manifest.display==='standalone'&&manifest.orientation==='any','Display/orientação inválidos');
 for(const icon of manifest.icons){const b=fs.readFileSync(icon.src);assert(b.subarray(0,8).toString('hex')==='89504e470d0a1a0a','Ícone não é PNG');assert(`${b.readUInt32BE(16)}x${b.readUInt32BE(20)}`===icon.sizes,'Dimensão divergente');}
 assert(index.includes('src="./pwa.js"')&&index.includes('src="./config.js"'),'Scripts PWA ausentes');
 assert(index.includes('fetch(backendUrl(url)'),'Configuração API não aplicada');
 assert(pwa.includes('scope:APP_BASE.pathname'),'SW não aceita subpasta');
 assert(sw.includes("url.pathname.startsWith('/api/')")&&sw.includes("url.pathname === '/healthz'"),'Exclusão API ausente');
 assert(sw.includes("event.data?.type === 'SKIP_WAITING'"),'Atualização controlada ausente');
 assert(read('render.yaml').includes('buildCommand: node scripts/check.mjs'),'Render sem validação');
 console.log(`Pacote ${APP_ID} válido: arquivos, versões, PWA, ícones, 7 obras e 326 combinações de serviço/FVS.`);
}catch(e){console.error(`Pacote inválido: ${e.message}`);process.exit(1)}
