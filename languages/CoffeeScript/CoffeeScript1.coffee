### once upon a time ###
#hello
print=(txt) -> document.getElementById('canvas').innerHTML+=txt+'<br/>'
flux_capacitor_constant=0.5463
initialize_time_circuits = (speed, year = 1998) -> 
  Math.floor(year * flux_capacitor_constant * speed * 100)/100
print(initialize_time_circuits(88))
print(initialize_time_circuits(3))
# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)
