use actix_web::{get, App, HttpResponse, HttpRequest, HttpServer, Responder};

#[get("/ping")]
async fn index(_req: HttpRequest) -> impl Responder {
    // return the headers of the request as a string

}

//error 404 on all other routes
#[get("/{tail:.*}")]
async fn error_404() -> impl Responder {
    HttpResponse::NotFound().body("404")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(index))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}