package golf.pinpointscore.clubhouse.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoursecardModel {

    private Long id;
    private int coursecardId;
    private java.sql.Timestamp submitted;
    private java.sql.Timestamp updated;
    private String coursecardName;
    private List<Integer> coursecardPars;
    private Integer coursecardTotalPar;

}