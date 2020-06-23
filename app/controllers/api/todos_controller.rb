class Api::TodosController < ApplicationController
  # Returns html (e.g. for just Rails)
  # xml
  # json
  # new and edit not here ... but on the react side

def index
  # return JSON object of all of the Todos
  render json: Todo.all
end

def show
  render json: Todo.find(params[:id])
end

def create
  @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo
    else
      render json: {errors: @todo.errors}, status: :unprocessable_entity
    end
end

def update
  @todo= Todo.find(params[:id])
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: {errors: @todo.errors}, status: :unprocessable_entity
    end
    # very similar to the create above, e.g.
end

def destroy
  Todo.find(param[;id]).destroy
  render json: {message: 'ToDo Deleted'}
end

private

  def todo_params
    params.require(:todo).permit(:title, :complete)
  end

end
