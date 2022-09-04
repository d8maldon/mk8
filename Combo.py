import random
import tkinter as tk

characters = ["Mario", "Luigi", "Peach","Daisy", "Rosalina", "Tanooki Mario",
"Cat Peach", "Yoshi","Toad","Koopa Troopa","Shy Guy","Lakitu","Toadette",
"King Boo","Baby Mario","Baby Luigi","Baby Peach","Baby Daisy","Baby Rosalina",
"Metal Mario","Pink Gold Peach","Wario","Waluigi","Donkey Kong","Bowser",
"Dry Bones","Bowser Jr.","Dry Bowser","Lemmy","Larry","Wendy","Ludwig",
"Iggy","Roy","Morton","Inkling Girl","Inkling Boy","Link","Villager (Male)",
"Villager (Female)","Isabelle","Mii","Gold Mario"]

character = random.choice(characters)


if character == "Yoshi" :
    Yoshis = ["Red Yoshi","Blue Yoshi","Light-blue Yoshi","Yellow Yoshi","Pink Yoshi",
"Black Yoshi","White Yoshi","Orange Yoshi"]
    character = random.choice(Yoshis)

elif character == "Shy Guy": 
    shyguys = ["Green Shy Guy","Blue Shy Guy","Light-Blue Shy Guy","Yellow Shy Guy","Pink Shy Guy",
                "Black Shy Guy","White Shy Guy","Orange Shy Guy"]
    character = random.choice(shyguys)


elif character == "Inkling Girl":
    character = random.choice(["Inkling Girl (lime green)","Inkling Girl (magenta)"] )

elif character == "Inkling Boy":
    character = random.choice(["Inkling Boy (purple)", "Inkling Boy (teal)"])

elif character == "Link":
    links = ["Normal Link","Link (Breath of the Wild)"]
    character = random.choice(links)





Kartbodies = ["Standard Kart"," Pipe Frame"," Mach 8"," Steel Driver"," Cat Cruiser"," Circuit Special"," Tri-Speeder"," Badwagon",
" Prancer"," Biddybuggy"," Landship"," Sneeker"," Sports Coupe"," Gold Standard"," GLA"," W 25 Silver Arrow",
"300 SL Roadster"," Blue Falcon"," Tanooki Kart"," B Dasher"," Streetle"," P-Wing"," Koopa Clown", 
"Standard Bike"," The Duke"," Flame Rider"," Varmint"," Mr Scooty"," Master Cycle Zero","City Tripper",
"Comet"," Sport Bike"," Jet Bike"," Yoshi Bike"," Master Cycle",
"Standard ATV"," Wild Wiggler"," Teddy Buggy"," Bone Rattler"," Splat Buggy","Inkstriker"]

kartbody = random.choice(Kartbodies)

Wheels = ["Standard", "Monster", "Roller", "Slim", "Slick", "Metal", "Button", "Off-Road", "Sponge", "Wood", "Cushion", 
"Blue Standard", "Hot Monster", "Azure Roller", "Crimson Slim", "Cyber Slick", "Retro Off-Road", "Gold Tires", 
"GLA Tires", "Triforce Tires", "Ancient Tires", "Leaf Tires"]

wheel = random.choice(Wheels)

Gliders = ["Super Glider", "Cloud Glider", "Wario Wing", "Waddle Wing", "Peach Parasol", "Parachute", "Parafoil", "Flower Glider", 
"Bowser Kite", "Plane Glider", "MKTV Parafoil", "Gold Glider", "Hylian Kite", "Paraglider", "Paper Glider"]

glider = random.choice(Gliders)



print("\n","Character:", character, "\n",
      "Kart Body:", kartbody, "\n", 
      "Wheel Type:", wheel, "\n",
      "Glider Type:", glider, "\n")





window = tk.Tk()

# list of fruits
combo = [character, kartbody, wheel, glider]

#action to be performed when button clicked
def clicked():
    for ind, part in enumerate(combo):
        # print names in the tkinter window
        # create a label widget
        names_label = tk.Label(window)
        # give it a position using grid
        names_label.grid(row=int(ind)+1, column=0)
        # print the fruit name in the label
        names_label.config(text=part)

btn = tk.Button(window, text="Kart Combination", command=clicked)
btn.grid(column=0, row=0, padx=30, pady=2)

window.mainloop()