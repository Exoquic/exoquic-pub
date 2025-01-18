/**
 * Used to publish events to Exoquic event-streaming platform.
 * 
 * @class ExoquicPublisher
 */
class ExoquicPublisher {
  
  /**
   * Constructs a ExoquicPublisher instance.
   * 
   * @param {Object} config Configuration object for the Exoquic Publisher.
   * @param {string} config.serverUrl The URL to exoquic, defaults to https://dev.exoquic.com.
   * @param {string} config.env The environment to connect to, defaults to "dev".
   * @param {string} config.apiKey The API key for the Exoquic account.
   */
  constructor({ apiKey, env = "dev", serverUrl = `https://${env}.exoquic.com` }) {
    if (!serverUrl) {
      throw new Error("ExoquicPublisher requires 'serverUrl' in the config.");
    }
    this.serverUrl = serverUrl;
    this.apiKey = apiKey;
  }

  /**
   * Publishes an event to Exoquic event-streaming platform.
   * 
   * @param {Object} event The event to be published.
   * 
   * @param {string} event.topic The topic that the event will be sent to. 
   * @param {string} event.payload Event payload to be sent. An object will be JSON serialized.
   * @param {string} [event.channel] The channel that the event will be sent through.
   * @param {string} [event.key] The event key - a key that can be used to group events together, used for stateful events.
   * 
   * @returns {Promise<void>} Promise that resolves if event was successfully published. Errors otherwise.
   */
  async publish(event) {
    if (!event.topic) {
      throw new Error("Failed to publish event: no topic specified.");
    }

    if ((!event.payload || event.payload == "") && !event.key) {
      throw new Error("Failed to publish event: payload and key cannot both be empty. If you want to send a tombstone event, specify a key and leave payload empty.");
    }

    const exoquicEvent = {
      topic: event.topic,
      channel: event.channel,
      key: event.key,
      payload: event.payload,
    };

    const response = await fetch(`${this.serverUrl}/publish`, {
      method: "POST",
      body: JSON.stringify(exoquicEvent),
      headers: {
        "X-API-KEY": this.apiKey
      }
    });
    
    if (response.status != 200 && response.status != 201) {
      const body = await response.text();
      throw new Error(body);
    }
  }
}

module.exports = { ExoquicPublisher };

