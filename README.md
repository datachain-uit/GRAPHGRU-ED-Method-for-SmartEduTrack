# GRAPHGRU-ED Method for SmartEduTrack

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

## 🎯 Research Objectives

### 📌 Predicting Course Completion Outcomes & Data Quality Assessment

- **Objective**: Develop deep learning models to predict whether learners will complete online courses, while also evaluating the quality of the learning data.

- **Approach**:
  - 📚 Use **MOOC-CubeX** dataset for training and evaluation.
  - 🧠 Enhance baseline models with **Graph Neural Networks (GNNs)**.
  - 🧪 Apply **data augmentation techniques** to improve model robustness.
  - 📏 Define and measure **data quality** using both direct and indirect metrics.
  - 📊 Analyze how **data quality impacts** model performance.

---

## ⚙️ Data Processing & Evaluation Functions

### 1️⃣ Data Preparation Pipeline

- 🧼 Clean, normalize, and augment the **MOOC-CubeX** dataset.
- 🔗 Merge multiple data sources into a unified structure.

---

### 2️⃣ Predicting Course Completion Outcomes

#### ✅ Direct Data Quality Metrics

- **Completeness**:  
  Measures the proportion of non-missing values across all fields.  
  - Formula:  
    ```
    Completeness = (Number of non-null values / Total expected values) × 100%
    ```
  - A high completeness score ensures sufficient data is available for learning and evaluation.

- **Consistency**:  
  Assesses whether the data follows logical and relational rules.  
  **Validation Criteria**:
  1. ✅ Domain Range: Values within predefined boundaries  
  2. ✅ Non-null: Required values must not be missing  
  3. ✅ Data Type: Values conform to expected types  
  4. ✅ Logical Constraints: Values satisfy logical relationships  
  5. ✅ Uniqueness: No duplicates where not allowed  
  6. ✅ Foreign Key Integrity: Valid cross-references in related datasets

---

#### 🔍 Indirect Data Quality Metrics

- **Reliability**:
  - Represents the trustworthiness and stability of data sources and collection methods.
  - Ensured by:
    - Using **MOOC-CubeX**, a widely accepted benchmark dataset.
    - Implementing standardized preprocessing to minimize bias and noise.

- **Relevance**:
  - Measures how appropriate the dataset is to the project’s goals.
  - Achieved by:
    - Selecting features tied directly to learner behavior and performance.
    - Ensuring dataset attributes align with model input needs (e.g., engagement, progression, demographics).

---

### 🧠 Model Functions

- 📂 Split dataset into **training**, **validation**, and **test** sets.
- 🔁 Train **GNN-based models** and compare against traditional baselines.

**Evaluation Metrics**:
- ✔️ **Accuracy**: Overall correct predictions
- 📌 **Precision**, **Recall**, **F1-score**: Especially for multi-class classification
- ⚖️ **Macro Average**: Equal weight for each class
- 📈 **Weighted Average**: Adjusted based on class frequency

---


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

## 👥 Contributor
- 👑 Leader: M.Sc. IT. Nguyễn Thị Anh Thư  
- 👨‍💻 Members: Nguyễn Viết Kha, Nguyễn Hoài Phương
