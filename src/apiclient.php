<?php

namespace Ademti\Pwe;

/**
 * Client that wraps up access to the API server with some helpful methods.
 */
class ApiClient {

	/**
	 * The API key to use as authentication.
	 *
	 * @var string
	 */
	private $api_key;

	/**
	 * The response code of the last request.
	 *
	 * @var int
	 */
	private $last_reponse_code;

	/**
	 * The body of the last response.
	 *
	 * @var string
	 */
	private $last_reponse_body;

	/**
	 * Constructor.
	 *
	 * Store the payment address for future use.
	 *
	 * @param string $api_key  The API key to use.
	 */
	public function __construct( $api_key ) {
		$this->api_base = apply_filters( 'pwe_api_base', 'https://api.paywithether.com/' );
		$this->api_key = $api_key;
	}

	/**
	 * Make a POST request to the API.
	 *
	 * @param  string $path  The path to post to on the API server.
	 * @param  array  $args  Array of post data to send with the request.
	 *
	 * @return int           The response code.
	 */
	public function post( $path, $args = [] ) {
		$default_args = [
			'apiKey' => $this->api_key,
		];
		$args = $default_args + $args;
		$response = wp_remote_post(
			$this->api_url( $path ),
			[
				'body' => $args,
			]
		);
		if ( is_wp_error( $response ) ) {
			$this->last_response_code = 500;
			$this->last_response_body = '';
		} else {
			$this->last_response_code = wp_remote_retrieve_response_code( $response );
			$this->last_response_body = wp_remote_retrieve_body( $response );
		}
		// Update / clear the API status accordingly.
		if ( in_array( $this->last_response_code, [ 200, 201 ], true ) ) {
			update_option( 'pwe_api_verified', time() );
		} elseif ( 403 === $this->last_response_code ) {
			delete_option( 'pwe_api_verified' );
		} else {
			// Do nothing - could be a transient failure, keep trying to use the
			// connection if we have it configured.
		}
		return $this->last_response_code;
	}

	/**
	 * Return the response code of the last request.
	 */
	public function get_response_code() {
		return $this->last_response_code;
	}

	/**
	 * Return the response body from the last request.
	 */
	public function get_response_body() {
		return $this->last_response_body;
	}

	/**
	 * Construct a full URL given the path of a request.
	 *
	 * @param  string $path  The path on the API server required.
	 *
	 * @return string        The full URL to the API server with the
	 *                       specified path.
	 */
	private function api_url( $path ) {
		return $this->api_base . $path;
	}
}
