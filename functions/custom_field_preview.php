<?php
add_action( 'save_post', function ( $post_id, $post ) {
	if ( isset( $_GET['meta-box-loader'] ) ) {
		$autosave = wp_get_post_autosave( $post_id );
		if ( $autosave ) {
			$filter = function ( $data ) use ( &$filter, $post ) {
				remove_filter( 'wp_insert_post_data', $filter );
				$data["post_modified"]     = gmdate( 'Y-m-d H:i:s', strtotime( $post->post_modified ) + 1 );
				$data["post_modified_gmt"] = gmdate( 'Y-m-d H:i:s', strtotime( $post->post_modified_gmt ) + 1 );

				return $data;
			};
			add_filter( 'wp_insert_post_data', $filter );
			wp_update_post( $autosave );
		}
	}
}, 10, 2 );
