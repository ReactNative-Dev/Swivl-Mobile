const pastMessagesLimit = 20;

export default class SocketHandler{

    constructor(delegate, server){
        this.server = server;
        this.delegate = delegate;
        this.hasConnected = false;
    }

    connect(){
        console.log("connecting to: %s", 'wss://'+this.server );

        try {
            this.socket = new WebSocket('wss://'+this.server);
        } catch(error) {
          console.warn('Error: Unable to connect.');
        }
        if (this.socket) {
          var self = this;
          this.socket.onopen    = function(event) { self.socketOnOpen(event); }
          this.socket.onmessage = function(event) { self.socketOnMessage(event); }
          this.socket.onerror   = function(event) { self.socketOnError(event); }
          this.socket.onclose   = function(event) { self.socketOnClose(event); }
        }
    }

    disconnect(){
        // this.socket.close();
        this.hasConnected = false;
    }

    socketOnOpen(){
         console.log('Connected.');
        this.hasConnected = true;
        if (this.hasConnected) {
          this.delegate.connectionOpened();
        } else {
          this.delegate.reconnected();
        }
    }

    socketOnMessage(event){
        console.log("socketOnMessage")
        var data = event.data;

        try {
            data = JSON.parse(data);
        } catch(error) {
            console.warn('Error: Unable to parse JSON.');
            return;
        }
        if (!data.type) { console.warn("Malformed frame"); return; }

        console.log("recieved frame type: %o", data.type);

        // Route received frames
        switch(data.type) {
            case 'AuthFrame':
                if (!data.auth) { console.warn('no auth in auth frame.'); return; }
                console.log('AuthFrame: ', data.auth);
                // this.delegate.receivedAuth(data.auth);
            break;

            case 'RequestAuthFrame':
                // socket.receiveRequestAuth(data.payload);
            break;

            case 'MessageFrame':
                if (data.message && data.message.type && data.message.type == 'text' || data.message.type == 'carousel'  || data.message.type == 'media') {
                    console.log('MessageFrame_recievedmsg: ', data.message);
                    this.delegate.receivedMessage([data.message]);
                } else if (data.message && data.message.type && data.message.type == 'command') {
                    console.log('MessageFrame_recievedcmd: ', data.message);
                //   this.delegate.receivedCommand(data.message);
                } else {
                    console.warn('Error: Message type not understood.', data.message);
                }
            break;

            case 'PastMessagesFrame':
                if (!data.messages) { console.warn('No past messages.'); return; }
                console.log('PastMessagesFrame: ', data.messages);
                 this.delegate.receivedPastMessages(data.messages, (data.messages && data.messages.length >= pastMessagesLimit ));
            break;

            case 'ShowTypingFrame':
                // this.delegate.showTyping();
            break;

            case 'OpenOrCloseFrame':
                // if (this.delegate.props.openOrClose) {  this.delegate.props.openOrClose(data.open); }
            break;
            
            case 'ErrorFrame':
                console.log(data.error.message);
            break;

            default:
                console.warn('Error: Frame type not understood.');
        }

    }

    socketOnError(event) {
        console.log('Disconnected.');
    }

    socketOnClose(event) {
        console.warn('Disconnected by server.');
        var self =  this;
        setTimeout(function() { self.connect(); },  3000);
    }

    sendFrame(object) {
        console.log("sending frame %o", object)
        // if (object.auth && this.delegate.props.canTakeOver) {
        if (object.auth) {
                object.auth.humanTakeover = true;
          object.auth.botId = this.delegate.botId;
        }

        this.socket.send(JSON.stringify(object));
    }

    sendRequestPastMessagesFrame(auth, olderThan, limit) {
        this.sendFrame({
          type: "RequestPastMessagesFrame",
          auth: auth,
          request:{
            limit:limit,
            olderThan:olderThan
        }})
    }
    
}