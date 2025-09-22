package golf.pinpointscore.clubhouse.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/", produces="text/html")
@CrossOrigin(origins="*")
public class ClubhouseController {

    @GetMapping("/")
    public String clubhouse() {
        return "<!DOCTYPE html> <html lang=\"en\"> <head> <meta name=\"robots\" content=\"noindex, nofollow\" /> <meta name=\"googlebot\" content=\"noindex, nofollow\" /> <meta charset=\"UTF-8\" /> <link rel=\"icon\" type=\"image/svg+xml\" href=\"https://pinpointscore.golf/pinpointscore.svg\" /> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /> <title>Pinpointscore</title> <meta name=\"title\" content=\"pinpointscore\" /> <meta name=\"description\" content=\"Tee box to green, track your golf game with ease\" /> <meta property=\"og:type\" content=\"website\" /> <meta property=\"og:url\" content=\"https://clubhouse.pinpointscore.golf/\" /> <meta property=\"og:title\" content=\"pinpointscore\" /> <meta property=\"og:description\" content=\"Tee box to green, track your golf game with ease\" /> <meta property=\"og:image\" content=\"https://pinpointscore.golf/pinpointscore.png\" /> <meta property=\"twitter:card\" content=\"summary_large_image\" /> <meta property=\"twitter:url\" content=\"https://clubhouse.pinpointscore.golf/\" /> <meta property=\"twitter:title\" content=\"pinpointscore\" /> <meta property=\"twitter:description\" content=\"Tee box to green, track your golf game with ease\" /> <meta property=\"twitter:image\" content=\"https://pinpointscore.golf/pinpointscore.png\" /> <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"https://pinpointscore.golf/apple-touch-icon.png\" /> <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"https://pinpointscore.golf/favicon-32x32.png\" /> <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"https://pinpointscore.golf/favicon-16x16.png\" /> <link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\" /> <link rel=\"manifest\" href=\"/site.webmanifest\" /> <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" /> <link href=\"https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap\" rel=\"stylesheet\" /> </head> <body style=\"overflow: hidden; background-color: #161616\"> <h1 style=\" overflow: hidden; text-align: center; width: 100%; margin: 50vh auto; color: #d4d4d4; font-family: 'Titillium Web', sans-serif; font-size: 60px; font-weight: 700; line-height: 125%; \" > Pinpointscore </h1> </body> </html>";
    }

}