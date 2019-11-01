import manimlib.imports as manim 
from scipy.stats import beta 

class Presentation(manim.GraphScene):
    CONFIG = {
        "x_min": -0.25,
        "x_max": 1,
        "x_axis_width": 9,
        "x_tick_frequency": 0.05,
        "y_min": -0.5,
        "y_max": 3,
        "y_tick_frequency" : 0.25,
        "y_axis_height" : 6,
        "graph_origin": 3.5*manim.DOWN + 3.5*manim.LEFT,
        "function_color": "RED",
        "axes_color": "BLUE"          
    }

    def construct(self): 

        text1 = manim.TexMobject('Introduction~to~Computer~Graphics')
        text2 = manim.TexMobject('Lucas~Machado~Moschen')
        text1.to_edge(manim.UP, buff = 0.5)
        text2.to_edge(manim.UP,buff = 1.5)
        self.play(manim.Write(text1))
        self.wait(1)
        self.play(manim.Write(text2))
        self.wait()
        self.setup_axes(animate = True)
        self.wait()
        self.drawFunction()

        big_rect = manim.Rectangle(height = 18, width = 20)
        big_rect.set_fill(manim.BLACK, opacity = 1)
        self.play(manim.FadeIn(big_rect,run_time = 2))
        self.wait()

    def drawFunction(self):
        func_graph = self.get_graph(self.func_to_graph, self.function_color)
        graph_lab = self.get_graph_label(func_graph, label = "Beta(5,5)")

        self.play(manim.ShowCreation(func_graph), manim.Write(graph_lab))
        self.wait(2)
        r = [0 for i in range(19)]
        for i in range(19):
            r[i] = manim.Rectangle(height = 1.714*self.func_to_graph(0.05*(i + 1/2)),width = 7.2*0.05,color = "YELLOW")
            r[i].set_fill(manim.YELLOW, opacity = 0.7)
            r[i].move_to(3.5*manim.DOWN + 3.5*manim.LEFT + 7.2*0.05*(i+1/2)*manim.RIGHT + 1.714*self.func_to_graph(0.05*(i + 1/2))/2*manim.UP)
            self.play(manim.ShowCreation(r[i],run_time = 0.1))
        self.wait(1)

    def func_to_graph(self, x):
        return beta.pdf(x,5,5)