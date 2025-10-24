# Finovate Climate App

A full-stack web application that combines ESG (Environmental, Social, and Governance) data with financial metrics to help users make informed investment decisions based on both profitability and environmental impact.

## Features

- **Interactive Data Visualization**: Dynamic charts and graphs showing ESG scores and financial metrics
- **Customizable Weighting**: Adjustable sliders to balance environmental preferences with financial performance
- **Real-time Data Processing**: Live updates based on user preferences
- **Comprehensive Stock Analysis**: Integration of ESG scores with P/E ratios, market cap, and other financial indicators
- **Modern UI**: Built with Material-UI components for a clean, responsive interface

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Material-UI (MUI)** - Component library for consistent design
- **D3.js** - Data visualization and manipulation
- **React Router** - Client-side routing
- **Webpack** - Module bundling and development server

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Socket.io** - Real-time communication
- **Express Session** - User session management

### Data Processing
- **Pandas** - Python data analysis (for backend processing)
- **CSV Data Sources** - ESG and financial datasets

## Data Sources

The application uses two main datasets:

1. **ESG Data** (`public/esg.csv`): Contains environmental, social, and governance scores for various companies
2. **Financial Data** (`public/financials.csv`): Contains financial metrics including P/E ratios, market cap, earnings, etc.

## Getting Started

### Prerequisites
- Node.js (>=18.x)
- MongoDB database
- Python (for data processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finovate-climate-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_SRV=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Update database configuration**
   In `server/server.js`, update:
   ```javascript
   const databaseName = "your_database_name";
   ```

### Running the Application

1. **Start the development server**
   ```bash
   npm run hotloader
   ```
   This starts the webpack dev server on port 5050 with hot reloading.

2. **Start the backend server** (in a separate terminal)
   ```bash
   npm start
   ```
   This starts the Express server on port 3000.

3. **Access the application**
   Open your browser and navigate to `http://localhost:5050`

### Production Build

To create a production build:
```bash
npm run build
```

## How It Works

### Data Integration
The application merges ESG and financial datasets based on company tickers, creating a comprehensive view of each company's environmental impact and financial performance.

### Weighted Scoring
Users can adjust the balance between environmental preferences and financial performance using interactive sliders:
- **Environmental Preference Slider**: Ranges from 0 to 1, determining how much weight to give ESG scores vs. financial metrics
- **Price Filter**: Allows filtering stocks by price range

### Real-time Updates
As users adjust the sliders, the application recalculates weighted scores and updates the visualization in real-time.

## Project Structure

```
finovate-climate-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── modules/    # Reusable modules (slider)
│   │   │   └── pages/      # Page components
│   │   ├── analysis.py     # Python data processing
│   │   └── utilities.js    # Utility functions
│   └── dist/              # Built frontend files
├── server/                # Backend Express application
│   ├── models/           # Database models
│   ├── api.js           # API routes
│   ├── auth.js          # Authentication logic
│   └── server.js        # Main server file
├── public/              # Static data files
│   ├── esg.csv         # ESG dataset
│   └── financials.csv  # Financial dataset
└── webpack.config.js   # Webpack configuration
```

## Development

### Key Components

- **Skeleton.js**: Main page component that renders the interactive slider
- **slider.js**: Core component with data processing and visualization logic
- **analysis.py**: Python script for data analysis and processing
- **api.js**: Backend API routes for data handling

### Adding New Features

1. **New Data Sources**: Add CSV files to the `public/` directory
2. **API Endpoints**: Extend `server/api.js` with new routes
3. **UI Components**: Create new components in `client/src/components/`
4. **Data Processing**: Modify `analysis.py` for new data transformations

## Data Visualization

The application features:
- Interactive line charts showing stock performance
- Dynamic data tables with sortable columns
- Real-time updates based on user preferences
- Responsive design for various screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
