# Pixel Fun

Welcome to Pixel Fun, a simple website that allows people to create pixel artwork.  A user can signup for an account and save artwork to a database as well as retrieve previous artwork.  This simple webpage is my Module 4 Javascript project for Flatiron School.  

## Installation

To run this application first clone the code from GitHub.

After cloning the repository run `bundle install` to install any required gems.

Navigate to the `/pixels_api/` folder.

Run `rails db:migrate` to create the tables and database.

If you want to use some starter data, run `rails db:seed`.

Run `rails s` from the prompt to start the local webserver.

Open the `index.html` file in the root of the project folder to start using the web app.  The webserver is needed to create new users, load previous users, and save artworks created.

## Usage

This is a simple website that allows users to create pixel art.  The first step is to select the grid size for the artwork.  Once the grid is created, there is a color picker tool to select the color to use.  Left clicking on the grid will fill the target pixel with the selected color.  A user can also click and drag to draw continuously.  Right clicking on a pixel will remove the color from it.  There is a button called "fill canvas" that will fill the entire grid with the selected color.  Clicking the "fill area" button will fill the enclosed area where the user next clicks with the selected color.  Clicking on the "eyedropper" button and then clicking the desired pixel will make the current color the same color as the pixel clicked.

A user can create a new account by typing in a username and clicking "Create."  Once a user is logged in, the pixel artwork can be saved, a previous pixel artwork can be loaded, or the current pixel artwork can be deleted.  Returning users can just type in the username and click "Login."  The username "frogers" can be used to see an already created user and the artwork saved.

## License

This program is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).