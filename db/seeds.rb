10.times do
  Todo.create(
    title: Faker::Food.ingredient,
    complete: true
  )
end

puts 'data has been seeded'
