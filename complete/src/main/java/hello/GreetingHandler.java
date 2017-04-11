package hello;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class GreetingHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        TextMessage msg = new TextMessage("[Raw] reportId Hello, " + message.getPayload() + "!");
        session.sendMessage(msg);
    }
}