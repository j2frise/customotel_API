terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

variable "heroku_app_name" {
  description = "variable de l'application en prod"
}

resource "heroku_app" "production" {
  name   = var.heroku_app_name
  region = "eu"
}

# Build code & release to the app
resource "heroku_build" "production" {
  app        = heroku_app.production.name
  buildpacks = ["https://github.com/j2frise/customotel_API.git"]

  source {
    url     = "https://github.com/mars/cra-example-app/archive/v2.1.1.tar.gz"
    version = "2.1.1"
  }
}

# Launch the app's web process by scaling-up
resource "heroku_formation" "production" {
  app        = heroku_app.production.name
  type       = "web"
  quantity   = 1
  size       = "Standard-1x"
  depends_on = [heroku_build.production]
}

output "example_app_url" {
  value = "https://${heroku_app.production.name}.herokuapp.com"
}