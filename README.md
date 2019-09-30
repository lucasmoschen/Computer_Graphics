<html>
<head>
	<title> B Cell Analysis </title>
	<script type="text/javascript" src="https://cdn.plot.ly/plotly-latest.min.js"></script>
	<script type="text/javascript" async
		src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML" async>
	</script>
	
</head>

<body>
<div style="font-size: 150%">
	<h1 align = "center"> Microscópico Eletrônico de Transmissão e Correção de Imagens de Células B por Histogramas</h1>
	<h3 align = "center"> Lucas Machado Moschen </h3>
	<h3 align = "center"> Escola de Matemática Aplicada - Fundação Getulio Vargas </h3>
	<h3 align = "center"> Rio de Janeiro, setembro de 2019 </h3>
	<h2 align = "center"> Motivação </h2>
		<p align = "justify"> 
			Desenvolver um projeto para a primeira avaliação do curso de Introdução à Computação Gráfica. O tema foi 
			por seu impacto nas áreas biológicas, visto que com imagens de células B, podemos estudar sua estrutura e 
			desenvolver métodos mais eficientes para o combate de doenças infecciosas. Todavia, ao conhecer os métodos 
			de obtenção de imagem, percebemos que algumas vezes, algumas falhas nesses processos e que antes de uma 
			análise mais precisa, necessitam de correção. Nesse ponto entra a computação gráfica, com a equalização de 
			histogramas e com a segmentação de imagem, a fim de ser separado a área de estudo de interesse da área não 
			interessante, como fundo de imagem ou erros. 
		</p>
	<h2 align = "center"> Introdução </h2>
	<p align = "justify">
		O sistema imunológico humano compreende diversos tipos de células que exercem as mais variadas funções de defesa 
		do organismo. Dentre elas existem os macrófagos, os netrófilos, os monócitos, os linfócitos T, os linfócitos B, 
		entre outras. Neste trabalho, focou-se nas nas células B, devido à sua importância por fabricar 
		anticorpos, proteínas que atuam como defensores do organismo ao interagir com os antígenos dos invasores. Essas 
		células passam por diferenciação, assim, a interação entre o antígeno estimulador do linfócito e do anticorpo produzido 
		é maior. 
	</p>
	<p align = "justify">Porém, como funciona essa diferenciação? O corpo humano produz milhões de diferentes tipos de células B que 
		apresentam um receptor de célula B (conhceido como BCR), responsável por fazer a ligação entre a membrana celular 
		e a imunoglobulina. Este receptor encontra-se na superfície de cada célula. Após receber um sinal da célula T auxiliar, os leucócitos 
		B podem se diferenciar em tipos distintos, como os plasmócitos e as células de memória B. Deste modo, a interpretação da estrutura 
		celular dos mais diferentes tipos e relacioná-la com sua função específica é algo que a computação gráfica pode contribuir 
		de forma significativa.
	</p>
	<p align = "justify">
		O primeiro passo é obter as imagens. Todavia, a forma natural de fotografar com a luz não é viável para objetos de estudo 
		na ordem de tamanho das células ou vírus. Deste modo, precisa-se do uso da ferramenta microscópio eletrônico de transmissão, que 
		emite um feixe de elétrons na direção de uma amostra fina e a interação entre os elétrons e a amostra é ampliada e focada em 
		uma tela fluorescente ou detectada por algum sensor. A resolução da imagem é significantemente maior, pois o comprimento de onda
		é pequeno. Desta maneira, é extremamente eficiente para as células, que desejamos estudar. 
	</p>
	<p align = "justify">  
		Por fim, antes de qualquer análise minunciosa de algum banco de dados à procura de relações com outras áreas da biologia e matemática, 
		como bioqímica, machine learning ou modelagem, necessita de uma limpeza de dados. Essa limpeza pode ser feita de várias maneiras, entretanto, 
		a análise de histograma é considerada bastante relevante, para equalizar imagens e poder compará-las. Os histogramas de coloração 
		proveem bastante informação sobre a imagem, como contraste e problemas de obtenção de imagem. Assim, o escopo do trabalho fica configurado. 
	</p>
	<h2 align = "center"> Metodologia </h2> 
	<p align = "justify"> 
		Este trabalho foi desenvolvido através de estudos teóricos na bibliográfica e simulações computacionais. As referências bibliogáficas estão todas 
		citadas ao final do texto e vieram como agregador de conhecimento, quanto para referência de modelos já existentes. As simulações computacionais 
		incluíram o banco de dados utilizado , que mostro abaixo, e a apresentação de resultados através de HTML. Para realizá-las, as linguagens de 
		programação utilizadas foram Javascript, linguagem natural da Web, e Python, para programação em escala. Nesse site, todas as simulações de histograma 
		são feitas em Javascript. Os resultados de histogramas são apresentados utilizando a bilbioteca do javascript Plotly.js, que é citada nas 
		referências. Observo que o Javascript apresenta problemas de leitura. Ele processa algumas funções não na ordem especificada pelo código, e às vezes 
		faz confusão com alguns histogramas, necessitando a atualização do site algumas vezes. Para isso, a necessidade de Python.
	</p>	
	<h3 align = "center"> Banco de Dados utilizado </h2>
	<p align = "justify"> 
		Foi utilizado um banco de imagens de domínio público, a fim de contribuir para a pesquisa na área de matemática e computação gráfica. Para 
		encontrá-lo basta clicar no seguinte link: <a href="https://lmb.informatik.uni-freiburg.de/resources/datasets/tem.en.html">  Clique aqui </a>. 
		Esse banco de imagens contém 122 imagens em tons de cinza com resolução \(1024 \times 1024\) e a intesidade de bits é 8. O formato das imagens 
		é TIFF. Entretanto, esse formato não é lido nos principais navegadores de internet. Com essa problerma em vista, o primeiro processo que teve 
		que ser feito foi o de converter as imagens do banco de dados para o formato PNG. Esse formato foi escolhido por sua flexibilidade 
		quanto à escolha do browser e por ser de código aberto. Observei também, juntamente a professora Asla de Sá, que não ocorreria nenhum tipo de 
		truncamento de imagem na conversão, visto que a intensidade de bits foi mantida. 
	</p>

	<h2 align = "center"> Histogramas </h2>
	<p align = "justify"> 
		Um histograma de uma imagem digital em tons de cinza é uma função discreta \( h(r_k) = n_k \), onde \(r_k\) é 
		o nível de cinza e \(n_k\) é o número de ocorrências na imagem deste tom. Em meus histogramas, tomarei ele normalizado, isto é, os valores 
		estarão no intervalo \([0,1]\). Então, podemos tomar a frequência como uma probabilidade aproximada de ocorrência. A partir dessa informação, 
		algumas conclusões podem ser tiradas, como, por exemplo: a imagem é mais clara ou mais escura, a imagem tem contraste alto ou baixo, etc. O 
		histograma também permite a vizualização da divisão de uma imagem em determinadas partes. Em meus histogramas, mostrarei a média ponderada 
		desse histograma, a fim de ter uma noção de como é o comportamento médio das cores da minha imagem. 
	</p>
	<div id = "image_analysis1" style = "width: 1200px height: 400px">
		<div id = "black_white" style = "width: 600px height: 400px; float: left;">
			<canvas id = "black_white_image" width="600" height= "400"></canvas>
		</div>
		<div id = "bw_histogram" style = "width: 600px height: 400px; float: right;"></div>
	</div>
	
	<div id = "image_analysis2" style = "width: 1200px height: 400px">
		<div id = "black_white2" style = "width: 600px height: 400px; float: left;">
			<canvas id = "black_white_image2" width="600" height= "400"></canvas>
		</div>
		<div id = "bw_histogram2" style = "width: 600px height: 400px; float: right;"></div>
	</div>
	
	<canvas id = "space" width="35" height = "1"></canvas>
	
	<p align = "justify"> 
		Observe que na primeira imagem, a coloração de tons mais escuros é predominante, o que faz com que 
		os componentes do histograma estejam mais concentrados à esquerda. Como o contraste também é baixo, os tons 
		tendem a se concentrar (descvio padrão baixo). Enquanto na segunda, os tons são mais distríbuidos. 
		Desta forma, a média aproxima-se do valor médio de uma distribuição uniforme. O contraste também é maior nessa imagem, devido a essa distribuição. 
	</p>
	
	<h2 align = "center"> Equalização de Histogramas </h2>
	<p align = "justify"> 
		Considere essas imagens de duas células B, obtidas pelo método de Transmission Eletronic Microscopic (TEM). A primeira imagem 
		apresenta uma configuração mais distribuída entre os tons de cinza, enquanto a segunda apresenta uma concentração de brancos, 
		como visto no histograma, e uma parte totalmente preta, provavelmente devido a algum problema de obtenção da imagem. Nesse sentido, 
		fica claro o interesse de fazer uma <b> equalização de histograma </b>, para posteriores análises de dados. A ideia de uma equalização 
		é espalhar os tons por um espectro maior, aumentando contraste e a diferença de percepção. 
	</p>
<figure>
	<canvas id="cells_inicial" width="1300" height="600"></canvas>
	<figcaption>
		Imagem de duas células B. É observável a diferença entre as duas imagens, uma com uma distribuição de brancos muito maior do que a outra.
		A segunda imagem tem um problema de obtenção. O dado apresenta um grande ruído. 
	</figcaption>
</figure>

<div id="histogram1" style = "width:1300px height:512px">
  <div id = "cell1" style="width:650px; float:left;"></div>
  <div id = "cell2" style="width:650px; float:right;"></div>
</div>

<h3 align = "center"> Definição: usando conceitos probabilísticos </h3>
	<p align = "justify">
		Seja \(r\) o nível de cinza de um determinado pixel. Por enquanto, utilizemos o fato de que \(0\leq r \leq 1\), para fins explicativos. Assim, 
		focamos nossa atenção em transformações do tipo \(s = T(r)\), que satisfazem a condição de ser monótona crescente no intervalo (injetividade!)
		especificado acima e \(0 \leq T(r) \leq 1\). Também é interessante que exista inversa para essa transformação. Note que a monotocidade 
		irá garantir que as cores mais escuras continuem dessa maneira, não abrindo precedentes para inversões de cores não desejadas 
		na análise, isto é, imagine cores mais tons mais escuros do que outros tornando-se mais claros após uma determinada informação. Essa 
		transformação não é interessante para analisar o dado, e, portanto, não é interessante. <i> Outros objetivos podem existir, porém. </i> 
		Note que estamos tratando essa transformação como contínua, não discreta. Desta maneira, vejamos o nível de cinza de um 
		pixel como uma variável aleatória no intervalo \([0,1]\). Seja \(p_r(r)\) a função densidade de probabilidade de \(r\). 
		Como \(s = T(r)\), uma propriedade da probabilidade diz que \(p_s(s) = p_r(r)\cdot |\frac{dr}{ds}|\).
	</p>
	<p align = "justify"> 
		Uma transformação com bastante importância particular no processamento de imagens tem a forma \(s = T(r) = \int_0^r p_r(w) dw \). 
		Nesse caso, a distribuição de \(s\) será uma uniforme no intervalo. Agora, para o problema em questão, como estamos tratando de 
		valores discretos, tomaremos \(s_k = T(r_k) = \sum_{j=0}^k p_r(r_j) \), onde \(p_r(r_j) = \frac{n_j}{n} \) e \(k = 0,1,2,...255\).
	</p>
	<p align = "justify"> 
		Então, a imagem processada é obtida através do mapeamento de cada pixel com seu pixel correspondente. 
		A transformação é chamada de equalização de histograma. Essa equalização espalha para o espectro completo da escala de cinza, como desejado
		anteriormente. 
	</p>
	
<figure>
	<canvas id="first_equalization" width="1400" height="600"></canvas>
	<figcaption>
		Vemos na parte superior 4 imagens do banco de dados de células B em seu formato original. Abaixo, após a transformação supracitada, obtemos o resultado.
		Note que a primeira imagem tem pouca variação, pois essa transformação distribui melhor as cores, entretanto, quando a imagem tem um histograma 
		bem distribuído, o resultado é pouco diferente. 
	</figcaption>
</figure>

<h3 align = "center"> Histogram Matching </h3>
	<p align = "justify"> 
		Também conhecido como Histogram Specification. Quando utilizamos o método anterior para equalizar o histograma, vimos que isso pode ser 
		automatizado, produzindo uma imagem com histograma uniforme (Basta fazer o cálculo de \(p_s(s)\)). Entretanto, às vezes é interessante 
		especificar a forma do histograma que desejamos que a imagem processada tenha. Aplica-se para fazer o<i> match </i>entre imagens de dois 
		sensores, cuja resposta seja levemente diferente. 
		Assim, consideremos \(p_r(r)\) e \(p_z(z)\) PDFs, que representam a distribuição do histrograma, da imagem original e da imagem processada, 
		respectivamente. Tomemos, então \(s\) de forma que \(s = T(r) = \int_0^r p_r(w) dw \) e definamos \(z\) com a propriedade \(G(z) = \int_0^z p_z(t) dt = s\).
		Desta dorma, \(G(z) = T(r) \implies z = G^{-1}[T(r)]\), assumindo a existência da inversa de \(G\). Desta forma:
		<ol type = "1">
			<li> Obtenho as distribuições acumuladas \(T(r) \) \(G(z)\) como anteriormente; </li>
			<li> Obtenho a transformação \(G^{-1}\), fazendo a comparação das distribuições (Veja imagem abaixo); e </li>
			<li> Obtenho a imagem de saída. </li>
		</ol>
	</p>
	
<figure>
<center>
<img src="http://paulbourke.net/miscellaneous/equalisation/diagram1.jpg" alt="cumulative function" width="600" height="350"> 
	<figcaption>
	Imagem das funções acumuladas, contínuas, com comparação entre os pontos com mesma ordenada. \(H(x)\) é minha referência, e portanto, para cada \(x\)
	em \(G(x)\), tomo \(x'\) tal que \(H(x') = G(x)\)
	</figcaption>
</center> 
</figure>

<p align = "justify"> 
	Todavia, obter essas expressões analitícamente nem sempre é possível. Em contrapartida, podemos utilizar no caso discreto com algumas aproximações. 
	Essas aproximações funcionam como uma comparação de elemento a elemento para cada tom diferente, buscando uma aproximação para o tom mais próximo. 
	Façamos um primeiro exemplo com a imagem crítica descrita acima. Usaremos, como referência a distribuição do histograma da primeira imagem, pois ela 
	deixa bem visível a célula. Outro motivo que a função \(G\) é injetiva no grande espectro, visto que \(p_z(z) > 0\), para quase todo \(z\).  
</p>
<div id = "hist_matching1" style = "width: 1400px height: 500px">
	<div id = "images_matching1" style = "width: 600px height: 500px; float: left;">
		<canvas id = "imagesMatching1" width="500" height= "500"></canvas>
	</div>
	<div id = "histogram_matching1" style = "width: 600px height: 500px; float: right;"></div>
</div>
<div id = "hist_matching2" style = "width: 1400px height: 500px">
	<div id = "images_matching2" style = "width: 600px height: 500px; float: right;">
		<canvas id = "imagesMatching2" width="500" height= "500"></canvas>
	</div>
	<div id = "histogram_matching2" style = "width: 600px height: 500px; float: left;"></div>
</div>
<div id = "hist_matching3" style = "width: 1200px height: 500px">
	<div id = "images_matching3" style = "width: 600px height: 500px; float: left;">
		<canvas id = "imagesMatching3" width="500" height= "500"></canvas>
	</div>
	<div id = "histogram_matching3" style = "width: 600px height: 500px; float: right;"></div>
</div>
<canvas id = "nothing" width = "100" height = "5"></canvas>
<p align = "justify"> 
	A diferença é notável. Porém, algo incomoda o modelo para mim: A área de preto, que agora se tornou cinza. Esse dado é dado perdido. 
</p>
<p align = "justify">
	Para a equalização de histograma e para o histogram matching, desenvolvi na linguagem de programação Python um arquivo com uma classe que implementa
	o que necessito para ter essas funções. Chamei essa classe de HistogramEqualization. A partir dela, é mais fácil fazer a equalização de histogramas 
	de imagens de forma estruturada. 
</p>
<h3 align = "center"> Testando com Distribuição Beta</h3> 

<p align = "justify">
	Às vezes, não queremos utilizar uma imagem do nosso domínio de imagens para fazer o matching de histograma, pois as imagens podem todas ter uma densidade 
	conjunta não necessariamente monótona estritamente crescente, para assim, poder utilizar o método acima citado. Neste caso, a distribuição beta tem duas 
	propriedades desejadas para o estudo em questão: flexibilidade, devido à escolha de dois parâmetros, que permite observar diferentes curvas; e ela tem o 
	suporte no intervalo \([0,1]\), limitado, como o nosso modelo em questão. Desta maneira, basta discretizar esse intervalo de maneira uniforme e aumentá-lo 
	linearmente para o intervalo \([0,255]\) e utilizar a distribuição beta. 
</p>

<p align = "justify"> 
	O problema passa, então, para um problema matemático, com diferentes interpretações: uma visão do problema pode ser com otimização. 
	Imagine que eu tome cada imagem do meu banco de dados, e calcule a distribuição conjunta. Agora, poderia interpretar o problema como:
	\(\min_{\alpha,\beta} \sum_{i=1}^N \sum_{j = 0}^{255} \min_{k} |G_{\alpha,\beta}(k) - T_i(j)|\), onde \(T:[0,255] \to [0,1]\) é a função acumulada da imagem, 
	\(G:[0,255] \to [0,1]\) é a função da distribuição acumulada da função beta, \(\alpha, \beta\) são os parâmetros da distribuição e \(N\) é o número de 
	imagens. Note que, a grosso modo essa modelagem permite, dado uma distribuição beta, eu somo os erros de cada tom, minimizando eles sempre. Outra forma 
	de imaginar o problema é enxergar como um problema estatístico, onde queremos estimar \(\alpha, \beta\), parâmetros da minha distribuição. 
</p>
<p align = "justify">
	Antes de dar um pouco de carga matemática nesse problema, eu pretendo neste trabalho observar qualitativamente a relação dessas distribuições 
	com o resultado das imagens. Neste caso, como vou tratar de problemas um tanto mais específicos e que existem um pouco mais de cálculo por 
	causa da distribuição beta, a linguagem javascript fica mais restrita e não é boa para o caso. Nesse sentido, pretendo a utilizar a linguagem 
	<i>Python</i> para mostrar a diferença nesses modelos. Observe, assim, algumas imagens geradas pelas diferentes distribuições, sujeitas a \(\alpha, \beta\).
	Para fazer os testes, recomendo usar o arquivo "image.py" que se encontra no GitHub de Lucas Moschen, como constado nas referências. Nele é 
	possível alterar os parâmetros e obter  as mais variadas imagens.
</p>

<figure>
	<canvas id="beta-distribution" width="1400" height="600"></canvas>
	<figcaption>
		Você pode observar quatro distribuições a abaixo beta com parâmetros distintos. (i) \(\alpha = \beta = 1\), similar a uniforme (equalização 
		de histograma), (ii) \(\alpha = \beta = 5\), similar a uma normal, com média em torno do tom médio (note o contraste bem menor), (iii) \(\alpha 
		= 8, \beta = 3\). Esse histograma se concentra nos brancos da imagem, e (iv) \(\alpha = \beta = 1.75\) Uma distribuição similar à parábola.
	</figcaption>
</figure>

<p align = "justify">
	Uma outra forma de obter um resultado similar é primeiro fazer a equalização de histograma em uma das imagens e depois utilizá-la como referência.
	O que acredito ser interessante é que variando apenas dois parâmetros, posso obter as mais variadas imagens extremamente distintas, como pudemos 
	observar. 
</p>

<h3 align = "center"> Image Segmentation com Thresholding </h3>

<p align = "justify"> 
	O objetivo de utilizar o método de Thresholding é sua fácil implementação e que ele é interamente baseado no formato de histograma. Originalmente, 
	ele foi pensado para distribuições bimodais, visto que ele separava o background do objeto em questão. Porém, ele parte do pressuposto de que o contraste 
	entre esses grupos é grande, o que deixa menos robusto o método. Outro problem que observei ao utilizar esse método é o ruído. Como ele não considera 
	a posição espacial dos pixels, se houver ruído na imagem, os agrupamentos ficam distorcidos. 
</p>
<p align = "jutify">
A definição matemática é bem simples no caso binário e é facilmente extendida para o caso não binário. Considere uma partição de pontos da reta real, entre
\(0\) e \(255\) dada por \(P = \{p_1,p_2,...,p_n\}\). Para cada pixel com colocação \(I_{i,j}\), tomo \(I'_{i,j} = int(255/n)\), se \(p_{k} \leq I_{i,j} \leq p_{k+1}\). 
Para realizar esse método, inicio com $n$ pontos bem distribuídos. Considero \(p_0 = 0\) e \(p_{n+1} = 255\). Assim, calculo a média entre o ponto anterior e o sucessor 
do histograma. A partir desse cálculo, obtenho uma nova média e contínuo nesse processo, até a convergência. Com os pontos na convergência, pinto novamente a imagem.  
</p>
<p align = "justify"> 
Mas qual o valor de \(n\)? Nesse caso, tomei \(n = 3\), para dividir a região em quatro partes, visto que observando o histograma referência, esse é o comportamento 
esperado. 
Observação: Um problema que observei foi o destacado na segunda imagem abaixo. 
</p>
<figure>
	<canvas id="thresholding" width="1200" height="1200"></canvas>
	<figcaption>
		Você pode observar o thresholding para cada imagem. São escolhidos três pontos. Observe que no caso da segunda imagem, apenas dois acabaram sendo utilizados. 
	</figcaption>
</figure>

<h2 align = "center"> Conclusão </h3>  
<p align = "justify">
Histogram Matching e Histogram Equalization são ótimas ferramenta para resolver problemas com o banco de dados, principalmente quando este é obtido por 
máquinas que podem apresentar falhas durante a obtenção de imagens. Desta forma, qualquer processamento de imagens com o objetivo de comparar as imagens, 
como, por exemplo comparar as estruturas das células do corpo, merece passar por essa análise. Fazer a comparação com a distribuição beta não foi algo que 
apresentou uma novidade para o campo de estudo, porém, permitiu fazer análises bem interessantes sobre o que se é desejado. Nesse caso, obter histogram 
matching de um banco de dados fica reduzido a escolher uma distribuição de interesse. 
Para o algoritmo de Thresholding, os resultados não me pareceram promissores por causa do ruído que as imagens, no geral, apresentavam. Mas foi de grande 
interesse a aplicação desse método. 
Esse estudo baseou-se em algoritmos já existentes na literatura, 
e, portanto, não apresentou grande diferencial quanto aos resultado, como mostro ao longo do escopo desse texto. A classe em <i> Python </i> ficará disponível 
para uso,  caso haja interesse em reproduzir o algoritmo citado, bem como o código em javascript para o mesmo. 
Acredito que o objetivo da disciplina de Introdução à Computação Gráfica tenha sido realizado. 
</p>
<p align = "justify">
Para futuros trabalhos, eu gostaria de resolver o problema de otimização duplo que se construiu quando pensei na obtenção dos parâmetros da distribuição 
beta. Acredito que escolhendo uma distribuição que de alguma forma minimize o erro do histogram matching fará com que a distribuição tenha cara de uma "média"
das distribuições de um banco de dados qualquer e, a partir daí, poder-se-ia ter uma relação bem interessante de equivalência entre as imagens. 
</p>

<h2 align = "center"> Referências Bibliográficas </h2>

<p = align = "justify"> 
[1] Volker Morath, Margret Keuper, Marta Rodriguez-Franco, Sumit Deswal, Gina Fiala, Britta Blumenthal, Daniel Kaschek, Jens Timmer, Gunther Neuhaus, 
Olaf Ronneberger, Wolfgang Werner A. Schamel: Semi-automatic procedure for the determination of the cell surface area used in systems immunology, 
Frontiers in Biosciences, 2012
</p>
<p>
[2] GONZALES, Rafael C.; WOODS, Richard E.. Digital Image Processing. 2. ed. New Jersey: Pearson, 2007  
</p>
<p>
[3] BOURKE, Paul. Histogram Matching. Acesso em http://paulbourke.net/miscellaneous/equalisation/. Dia 10 de setembro de 2019.
</p>

<h3 align = "center"> Banco de Dados e Pacotes </h3>
<p align = "justify">
[4] Computer Vision Group, TEM Dataset. Acesso em: https://lmb.informatik.uni-freiburg.de/resources/datasets/tem.en.html4
</p>
<p>
[5] Plotly para Javascript: https://plot.ly/javascript/
</p>
<p>
[6] Pillow para Python: https://pillow.readthedocs.io/en/stable/
</p>
<p>
[7] Numpy, Matplolib, Scipy e Os
</p>

	
<script type = "text/javascript" src = "image_processing.js"></script>
<script type = "text/javascript" src = "load_image.js"></script>
</div>
</body>
</html>
