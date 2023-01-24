import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import wikitext from './rollup-plugin-wikitext'
import CampaignConfig from './rollup-plugin-wikitext/campaign_config';
import * as fs from 'fs';
import * as toml from 'toml';
import { fileURLToPath } from 'url';

const campaigns = new CampaignConfig( toml.parse( fs.readFileSync( 'campaign_info.toml', 'utf8' ) ) );

// https://vitejs.dev/config/
export default defineConfig( {
	plugins: [
		vue(),
		wikitext( { campaignConfiguration: campaigns } )
	],
	build: {
		rollupOptions: {
			input: {
				desktop_ctrl: fileURLToPath( new URL( './banners/desktop/banner_ctrl.js', import.meta.url ) ),
				desktop_var: fileURLToPath( new URL( './banners/desktop/banner_var.js', import.meta.url ) ),
			},
			output: {
				inlineDynamicImports: false
			}
		}
	}
} )
