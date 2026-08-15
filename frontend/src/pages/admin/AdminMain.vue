<template>
  <div class="p-6">
    <!-- Page Header -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
    >
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Dashboard v3</h1>
        <nav class="breadcrumb mt-1">
          <span class="breadcrumb-item"><a href="/">Home</a></span>
          <span class="breadcrumb-item active">Dashboard v3</span>
        </nav>
      </div>
      <div class="mt-4 md:mt-0 flex gap-2">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Last updated: Just now
        </div>
      </div>
    </div>

    <!-- Stats Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Revenue -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">
                Total Revenue
              </p>
              <p class="text-2xl font-bold text-gray-800">$45,231</p>
              <div class="flex items-center gap-1 mt-2">
                <svg
                  class="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span class="text-sm text-green-600 font-medium">+12.5%</span>
                <span class="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Users -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Active Users</p>
              <p class="text-2xl font-bold text-gray-800">2,453</p>
              <div class="flex items-center gap-1 mt-2">
                <svg
                  class="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span class="text-sm text-green-600 font-medium">+8.2%</span>
                <span class="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Conversion Rate -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">
                Conversion Rate
              </p>
              <p class="text-2xl font-bold text-gray-800">3.24%</p>
              <div class="flex items-center gap-1 mt-2">
                <svg
                  class="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                <span class="text-sm text-red-600 font-medium">-2.1%</span>
                <span class="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Orders -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
              <p class="text-2xl font-bold text-gray-800">1,893</p>
              <div class="flex items-center gap-1 mt-2">
                <svg
                  class="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span class="text-sm text-green-600 font-medium">+5.7%</span>
                <span class="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Revenue Chart -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-medium text-gray-800">Revenue Overview</h3>
          <div class="flex items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary">Week</button>
            <button class="btn btn-sm btn-primary">Month</button>
            <button class="btn btn-sm btn-outline-secondary">Year</button>
          </div>
        </div>
        <div class="card-body">
          <!-- Placeholder for chart -->
          <div
            class="h-64 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center"
          >
            <div class="text-center">
              <svg
                class="w-12 h-12 text-gray-300 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p class="text-gray-500">Bar Chart placeholder</p>
              <p class="text-xs text-gray-400">
                Integrate Chart.js or ApexCharts
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Traffic Sources -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-medium text-gray-800">Traffic Sources</h3>
          <button
            type="button"
            data-lte-toggle="card-collapse"
            class="p-1.5 rounded hover:bg-gray-100 text-gray-500"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>
        <div class="card-body">
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded bg-blue-100 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-gray-800">Google</span>
                </div>
                <span class="text-sm font-bold text-gray-800">45%</span>
              </div>
              <div class="progress progress-sm">
                <div class="progress-bar bg-blue-500" style="width: 45%"></div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded bg-blue-100 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-gray-800"
                    >Facebook</span
                  >
                </div>
                <span class="text-sm font-bold text-gray-800">28%</span>
              </div>
              <div class="progress progress-sm">
                <div
                  class="progress-bar bg-indigo-500"
                  style="width: 28%"
                ></div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded bg-cyan-100 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-cyan-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      />
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-gray-800">Twitter</span>
                </div>
                <span class="text-sm font-bold text-gray-800">15%</span>
              </div>
              <div class="progress progress-sm">
                <div class="progress-bar bg-cyan-500" style="width: 15%"></div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-gray-800">Direct</span>
                </div>
                <span class="text-sm font-bold text-gray-800">12%</span>
              </div>
              <div class="progress progress-sm">
                <div class="progress-bar bg-gray-500" style="width: 12%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Transactions -->
      <div class="lg:col-span-2 card">
        <div class="card-header">
          <h3 class="text-lg font-medium text-gray-800">Recent Transactions</h3>
          <a href="#" class="text-sm text-blue-600 hover:underline">View All</a>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-medium text-gray-800">#TXN-001</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <img
                        src="https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=32"
                        class="w-8 h-8 rounded-full"
                      />
                      <span>John Doe</span>
                    </div>
                  </td>
                  <td class="text-gray-500">Dec 10, 2026</td>
                  <td class="font-medium">$250.00</td>
                  <td><span class="badge badge-success">Completed</span></td>
                </tr>
                <tr>
                  <td class="font-medium text-gray-800">#TXN-002</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <img
                        src="https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff&size=32"
                        class="w-8 h-8 rounded-full"
                      />
                      <span>Jane Smith</span>
                    </div>
                  </td>
                  <td class="text-gray-500">Dec 09, 2026</td>
                  <td class="font-medium">$180.00</td>
                  <td><span class="badge badge-warning">Pending</span></td>
                </tr>
                <tr>
                  <td class="font-medium text-gray-800">#TXN-003</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <img
                        src="https://ui-avatars.com/api/?name=Mike+Johnson&background=f59e0b&color=fff&size=32"
                        class="w-8 h-8 rounded-full"
                      />
                      <span>Mike Johnson</span>
                    </div>
                  </td>
                  <td class="text-gray-500">Dec 08, 2026</td>
                  <td class="font-medium">$420.00</td>
                  <td><span class="badge badge-success">Completed</span></td>
                </tr>
                <tr>
                  <td class="font-medium text-gray-800">#TXN-004</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <img
                        src="https://ui-avatars.com/api/?name=Sarah+Wilson&background=8b5cf6&color=fff&size=32"
                        class="w-8 h-8 rounded-full"
                      />
                      <span>Sarah Wilson</span>
                    </div>
                  </td>
                  <td class="text-gray-500">Dec 07, 2026</td>
                  <td class="font-medium">$89.00</td>
                  <td><span class="badge badge-danger">Failed</span></td>
                </tr>
                <tr>
                  <td class="font-medium text-gray-800">#TXN-005</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <img
                        src="https://ui-avatars.com/api/?name=Tom+Brown&background=ef4444&color=fff&size=32"
                        class="w-8 h-8 rounded-full"
                      />
                      <span>Tom Brown</span>
                    </div>
                  </td>
                  <td class="text-gray-500">Dec 06, 2026</td>
                  <td class="font-medium">$312.00</td>
                  <td><span class="badge badge-success">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Team Members -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-medium text-gray-800">Team Members</h3>
          <button class="btn btn-sm btn-outline-primary">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        <div class="card-body p-0">
          <div class="divide-y divide-gray-100">
            <div class="flex items-center gap-3 p-4">
              <img
                src="https://ui-avatars.com/api/?name=Alice+Cooper&background=3b82f6&color=fff"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">Alice Cooper</p>
                <p class="text-xs text-gray-500">Lead Designer</p>
              </div>
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <div class="flex items-center gap-3 p-4">
              <img
                src="https://ui-avatars.com/api/?name=Bob+Martin&background=10b981&color=fff"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">Bob Martin</p>
                <p class="text-xs text-gray-500">Senior Developer</p>
              </div>
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <div class="flex items-center gap-3 p-4">
              <img
                src="https://ui-avatars.com/api/?name=Carol+Davis&background=f59e0b&color=fff"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">Carol Davis</p>
                <p class="text-xs text-gray-500">Product Manager</p>
              </div>
              <span class="w-2 h-2 rounded-full bg-gray-400"></span>
            </div>
            <div class="flex items-center gap-3 p-4">
              <img
                src="https://ui-avatars.com/api/?name=David+Lee&background=8b5cf6&color=fff"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">David Lee</p>
                <p class="text-xs text-gray-500">Frontend Developer</p>
              </div>
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <div class="flex items-center gap-3 p-4">
              <img
                src="https://ui-avatars.com/api/?name=Eva+Garcia&background=ef4444&color=fff"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">Eva Garcia</p>
                <p class="text-xs text-gray-500">QA Engineer</p>
              </div>
              <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

