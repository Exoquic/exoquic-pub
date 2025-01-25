/**
 * Configuration object for the Exoquic Publisher.
 */
interface PublisherConfig {
	/**
	 * The URL to exoquic, defaults to https://dev.exoquic.com.
	 */
	serverUrl: string;
	
	/**
	 * The environment to connect to, defaults to "dev".
	 */
	env: "dev" | "prod";

	/**
	 * The API key for the Exoquic account.
	 */
	apiKey: string;
}

/**
 * Event object to be published to Exoquic event-streaming platform.
 */
interface ExoquicEvent {
	/**
	 * The topic that the event will be sent to.
	 */
	topic: string;
	/**
	 * The payload of the event. If the payload is empty, then
	 * the key is expected to be defined and non-empty, such event
	 * will delete all the events with the same key.
	 */
	payload: string | "";
	/**
	 * The channel that the event will be sent through.
	 */
	channel?: string;
	/**
	 * The event key - a key that can be used to identify a single or series of events.
	 */
	key?: string;
}

interface MultiChannelExoquicEvent {
	topic: string;
	payload: string | "";
	channels: string[];
	key?: string;
}

/**
 * ExoquicPublisher class.
 */
declare class ExoquicPublisher {
	/**
	 * Constructs a ExoquicPublisher instance.
	 * 
	 * @param config Publisher configurations
	 */
	constructor(
		config?: PublisherConfig
	);

	/**
	 * Publishes an event to Exoquic event-streaming platform.
	 * 
	 * @param event The event to be published
	 * @returns Promise that resolves if event was successfully published. Errors otherwise.
	 */
	publish(event: ExoquicEvent | MultiChannelExoquicEvent): Promise<void>;
}

export { 
	ExoquicPublisher,
	ExoquicEvent,
	PublisherConfig,
};
