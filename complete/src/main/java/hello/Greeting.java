package hello;

public class Greeting {

    private String content;
    private Integer reportId = 1;

    public Greeting() {
    }

    public Greeting(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public Integer getReportId() {
        return reportId;
    }
}
