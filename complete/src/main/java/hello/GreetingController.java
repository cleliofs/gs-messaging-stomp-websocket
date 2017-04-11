package hello;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import static java.lang.String.format;

@Controller
public class GreetingController {


    @MessageMapping("/hello/{id}")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message, @DestinationVariable Integer id) throws Exception {
        System.out.println(format("[STOMP-broker: topic] Received message: [%s]", message));
        final Greeting greeting = new Greeting("[STOMP-broker: topic] Hello, " + message.getName() + ", with id = " + id);
        return greeting;
    }

    @MessageMapping("/queue/hello/{id}")
    @SendTo("/queue/greetings")
    public Greeting privateGreeting(HelloMessage message, @DestinationVariable Integer id) {
        System.out.println(format("[STOMP-broker: queue] Received message: [%s]", message));
        return new Greeting("[STOMP-broker: queue] Hello, " + message.getName() + ", with id = id");
    }

}
