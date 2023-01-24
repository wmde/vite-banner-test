import doT from 'dot';
import template from './template';

const templateFn = doT.compile( template );

export default function wikitext( { campaignConfiguration } ) {
	return {
		name: 'wikitext',
		version: '1.0.0',
		async generateBundle( { file }, bundle, isWrite ) {
			if ( !isWrite ) {
				return;
			}

			console.log( bundle );

			Object.keys( bundle ).forEach( key => {
				const path = bundle[ key ].facadeModuleId;

				if( path ) {
					console.log( campaignConfiguration.getCampaignTrackingForEntryPoint( path ) );

					const fileData = templateFn( { banner: bundle[ key ].code } );
					this.emitFile( {
						type: 'asset',
						name: 'tmp',
						fileName: `${ bundle[ key ].name }.wikitext`,
						source: fileData
					} );
				}

				delete bundle[ key ];
			} );
		}
	};
}