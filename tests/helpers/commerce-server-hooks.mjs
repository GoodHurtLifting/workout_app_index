import {registerHooks} from "node:module";
const root=new URL("../../",import.meta.url);
registerHooks({resolve(specifier,context,next){
 if(specifier==="@/lib/admin-auth") return {url:"data:text/javascript,export async function getCatalogAdminForAction(){if(!globalThis.__waiTestAdmin)throw new Error('Not authorized');return {userId:'internal-emulator-test'}};export async function getCatalogAdmin(){return globalThis.__waiTestAdmin?{userId:'internal-emulator-test'}:null};",shortCircuit:true};
 if(specifier==="next/cache") return {url:"data:text/javascript,export function revalidatePath(){};export function unstable_cache(fn){return fn};",shortCircuit:true};
 if(specifier==="next/navigation") return {url:"data:text/javascript,export function redirect(url){throw new Error('TEST_REDIRECT:'+url)};",shortCircuit:true};
 if(specifier==="server-only") return {url:"data:text/javascript,export {};",shortCircuit:true};
 if(specifier==="@/lib/stripe-client") return {url:"data:text/javascript,export function stripeClient(){return globalThis.__waiTestStripe};export function stripeModeIsLive(){return false};",shortCircuit:true};
 if(specifier.startsWith("@/")) return next(new URL(specifier.slice(2)+".ts",root).href,context);
 return next(specifier,context);
}});
