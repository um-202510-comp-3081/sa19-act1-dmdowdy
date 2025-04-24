#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rails assets:precompile
bundle exec rails assets:clean

# If you're using a Free instance type (which we are), you need to
# perform database migrations in the build command.

# You cannot drop the managed database with a rails command, so do
# not edit migration files -- add new ones.
bundle exec rails db:migrate
# If you need to apply seed data, you can use this command to delete
# the existing data and create it fresh on each deploy.
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:seed:replant