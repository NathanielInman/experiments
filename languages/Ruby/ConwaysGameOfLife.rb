##############################################################################
# Conways Game of Life in Ruby - altered to work interpreted in the browser  #
# Nathaniel Inman on 07/01/2014                                              #
##############################################################################
# Original code by Olav @http://bjorkoy.com/2010/05/conways-game-of-life-in-ruby/
# Additional inspiration @http://rubyquiz.strd6.com/quizzes/193-game-of-life
# Conways Game of Life Information @http://en.wikipedia.org/wiki/Conway's_Game_of_Life
##############################################################################
#    Conways Game of Life in Ruby
#    Copyright (C) 2014  Nathaniel Inman
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#############################################################################

class Cell
    attr_writer :neighbors
    
    def initialize(seed_probability)
        @alive = seed_probability > rand
    end
    
    def next!
        @alive = @alive ? (2..3) === @neighbors : 3 == @neighbors
    end
    
    def to_i
        @alive ? 1 : 0
    end
    
    def to_s
        @alive ? 'o' : ' '
    end
end

class Game
    
    def initialize(width, height, seed_probability, steps)
        @width, @height, @steps = width, height, steps
        @cells = Array.new(height) { 
            Array.new(width) { Cell.new(seed_probability) } }
    end
    
    def play!
        (1..@steps).each do |i|
            `setTimeout(function(){#{next!}},#{i*500})`
        end
    end
    
    def next!
        @cells.each_with_index do |row, y|
            row.each_with_index do |cell, x|
                cell.neighbors = alive_neighbours(y, x)
                `ctx.fillStyle="#000";`
                `if(cell=='o')ctx.fillStyle="#F00";`
                `ctx.fillRect(x*v.w/100,y*v.h/50,v.w/100+1,v.h/50+1);`
            end
        end
        @cells.each { |row| row.each { |cell| cell.next! } }
    end
    
    def alive_neighbours(y, x)
        [[-1, 0], [1, 0], # sides
         [-1, 1], [0, 1], [1, 1], # over
         [-1, -1], [0, -1], [1, -1] # under
        ].inject(0) do |sum, pos|
            sum + @cells[(y + pos[0]) % @height][(x + pos[1]) % @width].to_i
        end
    end
    
    def to_s
        @cells.map { |row| row.join }.join("\n")
    end
end

Game.new(100, 50, 0.1, 100).play!