# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list
json.extract!(@board, :title, :user_id)

json.lists do
  json.array!(@board.lists) do |list|

    json.extract!(list, :title, :board_id, :ord)

    json.cards do

      json.array!(list.cards) do |card|
        json.extract!(card, :title, :list_id, :description, :ord)
      end

    end

  end
end
