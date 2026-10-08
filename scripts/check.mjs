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
 const solaris=catalogs.solaris;
 if(solaris.number==='24'){
  assert(solaris.items.length===28&&solaris.stages.length===9,'Escopo anterior DIFELIX incompleto');
 }else{
  assert(solaris.number==='23','Contrato Solaris desconhecido');
  const source=JSON.parse(read('solaris-contract-23.json'));
  assert(solaris.items.length===75&&solaris.stages.length===7,'Contrato 23 incompleto');
  assert(solaris.sourceFile===source.sourceFile&&solaris.sourceSheet===source.sourceSheet&&solaris.sourceSha256===source.sourceSha256,'Fonte do contrato 23 divergente');
  assert(JSON.stringify(solaris.stages)===JSON.stringify(source.stages),'Etapas divergentes da planilha');
  assert(JSON.stringify(solaris.phases.map(p=>p.name))===JSON.stringify(source.stages.map(s=>s.name)),'Etapas do seletor divergentes');
  assert(new Set(solaris.items.map(s=>s.code)).size===75,'Serviços duplicados');
  for(const [i,s] of solaris.items.entries()){
   const ref=source.items[i];
   assert(['index','sourceCode','name','sourceCell','stageIndex'].every(k=>s[k]===ref[k]),`Serviço divergente da planilha: ${s.code}`);
   assert(s.code===`DFX-23-${ref.index}`,'Identificador mistura contratos');
   assert(s.stage===`${ref.stageIndex} · ${source.stages.find(st=>st.index===ref.stageIndex).name}`,'Etapa do serviço incorreta');
   assert(solaris.phases.some(p=>p.id===s.phaseId)&&solaris.groups.some(g=>g.id===s.groupId&&g.phaseId===s.phaseId),'Serviço sem etapa no seletor');
  }
 }
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
 console.log(`Pacote ${APP_ID} válido: arquivos, versões, PWA, ícones, 7 obras e ${catalogs.lotus.items.length+solaris.items.length*6} combinações de serviço/FVS. Solaris: contrato ${solaris.number}, ${solaris.items.length} serviços, ${solaris.stages.length} etapas.`);
}catch(e){console.error(`Pacote inválido: ${e.message}`);process.exit(1)}
