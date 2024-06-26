---
title: Automating LinkedIn post extraction using Selenium and BeautifulSoup
description: Automating LinkedIn post extraction ssing Selenium and BeautifulSoup
date: 2024-06-26
categories: [tech, vs code, selemiun, Beautiful Soup, Linkedin]
tags: [tech, vs code, selemiun, Beautiful Soup, Linkedin]

---

## Automating LinkedIn Post Extraction Using Selenium and BeautifulSoup

We often come across valuable content that we want to save and revisit later. LinkedIn, a popular professional networking platform, offers a "Saved Posts" feature for this purpose. However, managing these saved posts can become cumbersome. In this tutorial, we’ll walk through how to automate the extraction of saved LinkedIn posts using Selenium and BeautifulSoup, and store the data in a CSV file for easy access and analysis.

## Why Do We Save So Much Stuff?

We live in an era where information is abundant and constantly being shared across various platforms. Social media, news sites, blogs, and forums all contribute to this information overload. As a result, we often find ourselves saving articles, posts, and links with the intention of reading them later or referring back to them when needed. Here are a few reasons why we tend to save so much content:

1. **Information Overload**: With the sheer volume of information available, it's impossible to consume everything in real-time. Saving content allows us to manage this overload and prioritize what we read and when (at least I try).
3. **Future Reference**: Whether it's a helpful tutorial, an insightful article, saving content ensures that we can easily reference it in the future.
4. **Content Curation**: For professionals who manage blogs, newsletters, or social media accounts, saving relevant content is crucial for curation and sharing with their audience.

![](https://i.imgflip.com/5w6kg5.jpg)
(same thing happens with 'save to read latter')

However, without a proper system to manage these saved items, they can quickly become overwhelming. This is where automation tools can help.

## Prerequisites

Before we dive in, make sure you have the following tools installed:

1. **Python**: Ensure you have Python installed on your machine. You can download it from [here](https://www.python.org/downloads/).
2. **Selenium**: Selenium is a powerful tool for controlling web browsers through programs and performing browser automation.
3. **BeautifulSoup**: BeautifulSoup is a library used for parsing HTML and XML documents.
4. **Pandas**: Pandas is a data manipulation and analysis library for Python.

   ![](https://i.imgflip.com/5w6kg5.jpg)
(same thing happens with 'save to read latter')

You can install the necessary libraries using pip:

```sh
pip install selenium beautifulsoup4 pandas

```
Additionally, download the appropriate ChromeDriver for your Chrome version from [here](https://googlechromelabs.github.io/chrome-for-testing/#stable).
![](https://i.imgur.com/0JJKMSr.png)


For this project, we'll use Visual Studio Code (VS Code), a popular and powerful code editor. You can download VS Code from [here](https://code.visualstudio.com/docs/?dv=win64user).

## Step-by-Step Guide
First, we need to set up Selenium to control the browser. We’ll initialize the WebDriver, log into LinkedIn, navigate to the saved posts page, and scroll to ensure all posts are loaded.



```
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import os
import pandas as pd
from bs4 import BeautifulSoup

# Path to ChromeDriver
chrome_driver_path = 'path/to/your/chromedriver'

# Configure Chrome options
chrome_options = Options()
chrome_options.add_argument("--disable-webrtc")
chrome_options.add_argument("--disable-logging")
chrome_options.add_argument("--log-level=3")

# Initialize Chrome WebDriver
service = Service(chrome_driver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

# Open LinkedIn and log in
driver.get('https://www.linkedin.com/login')
time.sleep(2)

# Log in (Replace with your credentials)
username = driver.find_element(By.ID, 'username')
password = driver.find_element(By.ID, 'password')
username.send_keys('your_username')
password.send_keys('your_password')

# Submit the login form
password.send_keys(Keys.RETURN)
time.sleep(60)  # Wait for any two-factor authentication

# Navigate to saved posts
driver.get('https://www.linkedin.com/my-items/saved-posts/')
time.sleep(5)

# Scroll to the bottom to load all posts
last_height = driver.execute_script("return document.body.scrollHeight")
while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# Extract HTML content
html_content = driver.execute_script("return document.documentElement.outerHTML;")

# Save HTML content to a file
download_path = 'path/to/your/download/directory'
saved_file = os.path.join(download_path, 'LinkedIn_Saved_Posts.html')
with open(saved_file, 'w', encoding='utf-8') as file:
    file.write(html_content)

# Close the browser
driver.quit()

```

## 2. Parsing HTML with BeautifulSoup

Next, we’ll parse the saved HTML file and extract the necessary data using BeautifulSoup. To identify the correct HTML elements, we used [Greg Philps](https://www.linkedin.com/feed/update/urn:li:activity:7211666232737964032/)'  LinkedIn post for inspection. This helped us determine the fields we needed to extract.

While inspecting the elements, we found that extracting the date didn't work perfectly, but the other fields were successfully retrieved.
![](https://i.imgur.com/9evL7IF.png)

```
# Read the saved HTML file and parse it
with open(saved_file, 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

posts_data = []

# Extracting data from each post
for post in soup.select('div.entity-result__content-container'):
    pessoa_element = post.select_one('span.entity-result__title-text > a')
    pessoa = pessoa_element.text.strip() if pessoa_element else 'N/A'
    link_element = post.select_one('a.app-aware-link')
    link = link_element['href'] if link_element else 'N/A'
    assunto_element = post.select_one('p.entity-result__content-summary')
    assunto = assunto_element.text.strip() if assunto_element else 'N/A'
    
    # Extracting the date
    data_element = post.find('span', class_='t-black--light t-12')
    data_post = data_element.find_next(text=True).strip() if data_element else 'N/A'

    posts_data.append([pessoa, link, assunto, data_post])

# Save the extracted data to a CSV file
df = pd.DataFrame(posts_data, columns=['Pessoa', 'Link', 'Assunto', 'Data'])
csv_file_path = os.path.join(download_path, 'LinkedIn_Saved_Posts.csv')
df.to_csv(csv_file_path, index=False, encoding='utf-8')

print(f"Data saved to {csv_file_path}")
```

## Conclusion
With this script, you can automate the process of extracting saved posts from LinkedIn. By leveraging Selenium to handle browser automation and BeautifulSoup for HTML parsing, we can efficiently gather and process data. This can be especially useful for content curators, data analysts, or anyone looking to manage their LinkedIn saved posts more effectively.

Feel free to customize the script further to suit your needs. 
Happy coding!
