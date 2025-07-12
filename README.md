# GCN-I Method for SmartEduTrack

SmartEduTrack leverages **Graph Convolutional Networks (GCN)** to address two major challenges in educational datasets: **sparsity** and **diversity**. This project introduces a novel method, **GCN-I**, which enhances data quality by inferring and filling in missing values within learner behavioral data using graph-based reasoning.

While traditional imputation methods (e.g., default value substitution) often lead to loss of important semantic information, GCN-based inference takes advantage of the **structural relationships between data entities**. By modeling the data as a graph, GCN learns how to propagate information across connected nodes, enabling **context-aware and semantically-rich estimations** of missing values.

---

## 📁 Project Structure

```
|-- LaTex-paper
| |-- img
| | -- uitlogo.png 
| |-- main.bib
| -- main.tex
|
|-- src
| |-- data
|   |-- datasets
|   |-- notebooks
| |-- video demo
| |-- Website demo
|   |-- backend
|   |-- frontend
```

## 🚀 How to Run SmartEduTrack Locally

Follow the steps below to run the SmartEduTrack platform on your local machine.

### Step 1: Install Python

Install **Python 3.11.6**, then install the required backend dependencies:

```bash
cd src/backend
pip install -r requirements.txt
```
### Step 2: Install Node.js and Frontend Dependencies

Start the backend and frontend servers with the following commands:
```bash
cd src/frontend
npm install
```

### Step 2: Install Node.js and Frontend Dependencies
```bash
# In backend directory
python manage.py runserver

# In frontend directory
npm run dev
```

- Backend runs on port 5000

- Frontend runs on http://127.0.0.1:3000

## 🧩 Prerequisites
Make sure you have the following installed:
- Python >= 3.11.6
- Node.js and npm