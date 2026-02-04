import React from 'react';
import { MessageCircle, Users, AlertCircle } from 'lucide-react';

const NoDataPlaceholder = ({ type = 'tickets' }) => {
  if (type === 'tickets') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Support Tickets</h3>
        <p className="text-gray-500 mb-4 max-w-sm">
          There are no support tickets to display. Tickets will appear here when users submit support requests.
        </p>
        <div className="flex items-center text-sm text-gray-400">
          <Users className="w-4 h-4 mr-1" />
          <span>Waiting for user submissions</span>
        </div>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Connection Error</h3>
        <p className="text-gray-500 mb-4 max-w-sm">
          Unable to load support tickets. Please check your connection and try again.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MessageCircle className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
      <p className="text-gray-500">
        There's nothing to display at the moment.
      </p>
    </div>
  );
};

export default NoDataPlaceholder;





