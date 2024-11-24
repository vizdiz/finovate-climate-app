import pandas as pd
import matplotlib.pyplot as plt
import os
import requests


df1 = pd.read_csv("ESG_data.csv")
df2 = pd.read_csv("financials.csv")
# print(df.head(10))

# sorts ESG dataset by total_score, can change for Environmental, Social, and Governmental
df1 = df1.sort_values(by="total_score", ascending=False, inplace=False)

# changes all the tickers in the ESG dataset to uppercase
df1["ticker"] = df1["ticker"].str.upper()
# print(df1["ticker"])
# print(df2["ticker"])

# create a new column P/E divided by E/S for ratio, higher the ratio higher the predicted profitability
df2["P/E_to_EPS"] = df2["Price/Earnings"] / df2["Earnings/Share"]
df2 = df2.sort_values(by=["P/E_to_EPS", "Market Cap"], ascending=[False, True], inplace=False)

# try to compile data to weigh stock profitability with ESG
# print(df2[["ticker", "Name", "P/E_to_EPS"]])

common_tickers = df1["ticker"].isin(df2["ticker"])

df_new = pd.merge(df1, df2, on='ticker', how='inner')

df_new = df_new.sort_values(by="P/E_to_EPS", ascending=False)
print(df_new)

def weight(environmental):  
  '''
  Takes in environmental as a float from 0.0 to 1.0 inclusive, representing the degree to measure each value
  '''

  if environmental == 0:
    return df_new
  
  df_new['weighted_value'] = environmental * df_new['total_score'] + (1-environmental) * df_new['P/E_to_EPS']
  df_new_sorted = df_new.sort_values(by='weighted_value', ascending=False)

  return df_new_sorted

print(weight(1.0))

def price_adjust(price_cap):
  df_new_price = df_new[df_new['Price'] < price_cap]
  return df_new_price

print(price_adjust(100))