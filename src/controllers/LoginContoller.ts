import { Request, Response, NextFunction } from "express";
import { get, controller, bodyValidator, post } from "./decorators";

// For test purposes
// -------------------------------------------------------------------
// function logger(reg: Request, res: Response, next: NextFunction) {
//   console.log("Request was made.");
//   next();
// }

@controller("/auth")
class LoginController {
  @get("/login")
  // @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
      <div>
        <label>
          Email
        </label>
        <input name="email" />
      </div>
      <div>
        <label>
          Password
        </label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === "123@mail.com" && password === "123") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email and/or password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect("/");
  }
}
