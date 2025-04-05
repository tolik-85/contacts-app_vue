<template>
  <nav class="nav-extended teal">
    <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input
            class="teal-text text-lighten-5"
            id="search"
            type="search"
            placeholder="Поиск в контактах"
            required
          />
          <label class="label-icon" for="search"
            ><i class="material-icons">search</i></label
          >
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>

    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab">
          <a href="#tab-1">
            <span class="material-symbols-outlined">star</span>
          </a>
        </li>
        <li class="tab">
          <a href="#tab-2">
            <span class="material-symbols-outlined">chronic</span>
          </a>
        </li>
        <li class="tab">
          <a class="active" href="#tab-3">
            <span class="material-symbols-outlined">people</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
